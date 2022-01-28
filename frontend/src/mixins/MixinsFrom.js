const MixinsFrom = {
    data() { 
        return {
            name: '',
            age: ''
        }
    },
    
    methods: {
        ckFrom(){
            console.log(this.name, this.age);
        }
    }
}

export default MixinsFrom