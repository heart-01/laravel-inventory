const MixinsFrom = {

    props: { //ตัวแปรแบบ props จะสามารถเอาไว้รับค่าในการส่งเข้ามาได้
        title: String,
        detail: String
    },
    
    methods: {
        ckFrom(){
            console.log(this.title, this.detail);
        }
    }
}

export default MixinsFrom