import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let storage = window.localStorage,
    isStorageSupport = typeof storage != 'undefined';
if (!isStorageSupport) {
    console.log('browser do not support localStorage');
}

export default new Vuex.Store({
    state: {
        name: JSON.parse(storage.getItem('name')) ||  '',
    },
    mutations: {
        addname(state, name){
            state.name = name
            if (isStorageSupport) {
                storage.setItem('name', JSON.stringify(name));
            }
            // console.log(state.name)
        }
    }
})
