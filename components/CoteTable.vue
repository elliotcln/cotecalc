<template>
    <div class>
        <button
            @click.prevent="cotesVisible = !cotesVisible"
            class="block w-full p-4 rounded text-center bg-blue-500 text-white font-semibold"
        >{{ cotesVisible ? 'Cacher' : 'Afficher' }} les cotes</button>
        <template v-if="cotesVisible">
            <section class="grid grid-cols-2 gap-4 my-4">
                <div>
                    <h3 class="font-semibold mb-2 text-center">Cotes Match #1</h3>
                    <div
                        v-for="(c1, index) in state.match1.cotes"
                        :key="index"
                        class="flex space-x-2 items-center"
                        :class="index === state.match1.cotes.length - 1 ? 'mb-0' : 'mb-1'"
                    >
                        <label
                            class="flex-shrink-0 font-bold"
                            :for="'match1-cote-' + index"
                        >{{ scores[index] }}</label>
                        <input
                            :id="'match1-cote-' + index"
                            type="number"
                            class="w-full border rounded p-2"
                            step="0.01"
                            min="0"
                            max="100"
                            :value="c1"
                            @change="editCote('match1', index, $event.target.value)"
                        />
                    </div>
                </div>
                <div>
                    <h3 class="font-semibold mb-2 text-center">Cotes Match #2</h3>
                    <div
                        v-for="(c2, index) in state.match2.cotes"
                        :key="index"
                        class="flex space-x-2 items-center"
                        :class="index === state.match2.cotes.length - 1 ? 'mb-0' : 'mb-1'"
                    >
                        <label
                            class="flex-shrink-0 font-bold"
                            :for="'match1-cote-' + index"
                        >{{ scores[index] }}</label>
                        <input
                            :id="'match1-cote-' + index"
                            type="number"
                            class="w-full border rounded p-2"
                            step="0.01"
                            min="0"
                            max="100"
                            :value="c2"
                            @change="editCote('match2', index, $event.target.value)"
                        />
                    </div>
                </div>
            </section>
        </template>
        <!-- filtrer les meilleures cotes -->
        <button
            @click.prevent="filterCotes"
            class="mt-4 block w-full p-4 rounded text-center bg-green-500 text-white font-semibold"
        >Filtrer les cotes</button>
        <template v-if="Array.isArray(filteredCotes) && filteredCotes.length === 0">
            <p class="text-gray-400 py-4 text-center">Aucun résultats pour ce Z et ces cotes ...</p>
        </template>
        <template v-if="Array.isArray(filteredCotes) && filteredCotes.length > 0">
            <section class="my-4">
                <div class="flex text-gray-500 uppercase text-xs font-bold tracking-wide">
                    <span class="w-full text-center">Match #1</span>
                    <span class="w-full text-center">Cote</span>
                    <span class="w-full text-center">Match #2</span>
                </div>
                <div class="flex mt-2" v-for="(fc, index) in filteredCotes" :key="index">
                    <span class="w-full p-1 text-center">{{ scores[fc.index1] }}</span>
                    <span class="w-full p-1 font-bold text-center text-green-500">{{ fc.cote }}</span>
                    <span class="w-full p-1 text-center">{{ scores[fc.index2] }}</span>
                </div>
            </section>
        </template>
    </div>
</template>

<script>

export default {
    props: ['state', 'z'],
    data() {
        return {
            cotesVisible: false,
            filteredCotes: null,
            scores: [
                '1-0', '2-0', '2-1', '3-0', '3-1', '3-2', '4-0', '4-1', '4-2', '4-3',
                '0-0', '1-1', '2-2', '3-3', '4-4',
                '0-1', '0-2', '1-2', '0-3', '1-3', '2-3', '0-4', '1-4', '2-4', '3-4',
                'Autres'
            ]
        }
    },
    methods: {
        editCote(matchIndex, index, newValue) {
            const payload = {
                matchIndex: matchIndex,
                index: index,
                newValue: newValue
            }
            console.log('payload', payload)
            this.$store.commit('editCote', payload)
        },

        filterCotes() {
            this.filteredCotes = []
            let c1 = this.state.match1.cotes
            let c2 = this.state.match2.cotes

            c1.forEach((c, index) => {
                for (let i = 0; i < 26; i++) {
                    const result = Math.round((c * c2[i]) * 100) / 100
                    if (result == this.state.z) {
                        const r = {
                            index1: index,
                            index2: i,
                            cote: result
                        }

                        this.filteredCotes.push(r)
                    }
                }
            })
            console.log('this.filteredCotes', this.filteredCotes)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>