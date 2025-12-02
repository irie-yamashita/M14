import { onMounted, ref } from "vue"

export function useFetch(url) {
    const data = ref(null);
    const error = ref(null);
    const loading = ref(true);


    const fetchData = async () => {
        
        loading.value = true;
        error.value = null;


        try {
            const res = await fetch(url);
            data.value = await res.json();

            if(!res.ok) {
                throw new Error('Error a la petició: '+res.status);
            }

        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    }

    onMounted(fetchData)

    //retorno variables reactives
    return { data, error, loading }
}