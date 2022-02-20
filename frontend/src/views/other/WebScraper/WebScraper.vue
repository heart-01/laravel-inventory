<template>
    <div class="text-center">
        <h1> Web Scraper</h1>
        <div class="wrapper">
            <div v-for="(data,index) in lastestArticles" :key="index">
                <span v-text="data.title"></span>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
// Scraper
import cheerio from 'cheerio'
import axios from 'axios'

    export default {

        data(){
            return {
                lastestArticles: [], // defined empty array variable 
            }
        },
        methods:{
            getWebsiteData(){
                let url = 'https://www.msn.com/en-au?AR=1'  // url we get data from
                let dataArray = []                          // we put data in this array
                let self = this //สร้าง this เพื่อเข้าถึงตัวแปร data ในตอนเรียกใช้ callback function
                // GET request for remote image in node.js
                axios({
                    method: 'get',
                    url: url,
                })
                .then(function (response) {
                    // console.log(response.data)

                    let html = response.data

                    let $ = cheerio.load(html)

                    $("ul.tertiary li a").each(function(){
                        const title = $(this).find('h3').attr('aria-label')
                        const image  = $(this).find('img').attr('src')

                        // putting data in array.
                        dataArray.push({
                            'title': title,
                            'image': image
                        })
                    })

                    self.lastestArticles = dataArray     // Here we assign value to vuejs variable

                })
            }
        },
        created(){
            this.getWebsiteData()
        }
        
    }
</script>