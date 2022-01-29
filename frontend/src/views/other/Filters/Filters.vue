<template>
    <div>
        <p class="h1">{{ $filters.currencyUSD(message) }}</p>
        <p class="h1">{{ $filters.firstCharacter(message) }}</p>
        <p class="h1">{{ $filters.uppercase(message) }}</p>
    </div>

    <div>
        {{ uppertext }}
    </div>
</template>

<script>
    export default {
        name: 'Filters',

        data () {
            return {
                message: 'Ep2. Filters',
                items: [
                    {
                        name: 'mark omg',
                    },
                    {
                        name: 'jame god',
                    },
                    {
                        name: 'david halo',
                    }
                ]
            }
        },

        //filters ใช้กำหนดตัวกรองที่สามารถใช้เพื่อใช้การจัดรูปแบบข้อความทั่วไป 
        //ถ้าใช้ filters แบบ local component จะต้องใช้ computed แทน
        computed: {
            uppertext() {
                let text=[]
                this.items.forEach((value) =>
                {
                    let word = ''
                    const arr = value.name.split("")
                    for (var i = 0; i < arr.length; i++) {
                        if(arr[i].charCodeAt(0) == "O".charCodeAt(0) || arr[i].charCodeAt(0) == "o".charCodeAt(0))
                        {
                            word += arr[i].toUpperCase()
                        }else{
                            word += arr[i]
                        }
                    }
                    
                    text.push(word.charAt(0).toUpperCase() + word.slice(1));
                });
                
                return text
            }
        }
    }
</script>