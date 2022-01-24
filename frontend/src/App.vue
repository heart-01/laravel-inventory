<template>
  <router-view />
</template>

<script>

let brand = " | Inventory Vue SPA"

export default {
  name: 'App',
  watch: { //watch คือ ตัวที่คอยเปลี่ยนแปลงข้อมูลที่เราเรียกช้งาน หรือ ตัวเฝ้าดูว่าเราเรียกใช้งานอะไรบ้าง
      $route(to){ //$route เป็นตัวแปรที่ vue router ได้สร้างเอาไว้อยู่แล้ว vue router เป็นตัวที่เลือกมาติดตั้งตอนเริ่มโปรเจค
        document.title = to.meta.title + brand, //document เป็นตัว javascript ที่เข้าถึง dom ในหน้านั้น
        document.description = to.meta.description
      } 
  }
}
</script>