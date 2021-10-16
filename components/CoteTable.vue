<template>
    <div class="flex">
        <div class="w-14 flex-shrink-0 border-r overflow-hidden flex items-center pr-2">
            <!-- <h2
                class="font-semibold transform -rotate-90 origin-bottom-left translate-x-1/4 translate-y-full flex-shrink-0"
            >{{ state.match2.firstTeam }} / {{ state.match2.secondTeam }}</h2>-->
            <h2
                class="font-semibold transform -rotate-90 origin-bottom-left translate-x-1/4 translate-y-full flex-shrink-0"
            >Match #2</h2>
        </div>
        <div class="flex-grow w-full overflow-x-auto">
            <!-- <h2
                class="font-semibold text-center pb-2 border-b"
            >{{ state.match1.firstTeam }} / {{ state.match1.secondTeam }}</h2>-->
            <h2 class="font-semibold text-center pb-2 border-b">Match #1</h2>
            <div class>
                <table class="w-full text-xs">
                    <tbody>
                        <tr>
                            <th class="border-b"></th>
                            <th
                                v-for="(c1, index) in state.match1.cotes"
                                :key="index"
                                class="p-1 border-b border-r border-l"
                            >
                                <input
                                    type="number"
                                    class="w-12 font-bold"
                                    step="0.01"
                                    min="0"
                                    max="100"
                                    :value="c1"
                                    @change="editCote('match1', index, $event.target.value)"
                                />
                            </th>
                        </tr>
                        <tr v-for="(c2, index) in state.match2.cotes" :key="index">
                            <th class="text-right border-r border-b p-1">
                                <input
                                    type="number"
                                    class="w-12 font-bold"
                                    step="0.01"
                                    min="0"
                                    max="100"
                                    :value="c2"
                                    @change="editCote('match2', index, $event.target.value)"
                                />
                            </th>
                            <td
                                class="text-center border"
                                :class="(Math.round((c1 * c2) * 100) / 100) == z ? 'bg-green-500 text-white' : ''"
                                v-for="(c1, i) in state.match1.cotes"
                                :key="i"
                            >{{ (Math.round((c1 * c2) * 100) / 100) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['state', 'z'],
    methods: {
        editCote(matchIndex, index, newValue) {
            const payload = {
                matchIndex: matchIndex,
                index: index,
                newValue: newValue
            }
            console.log('payload', payload)
            this.$store.commit('editCote', payload)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>