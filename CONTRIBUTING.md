# Project structure
project structure is adpated from this
https://medium.com/@Charles_Stover/optimal-file-structure-for-react-applications-f3e35ad0a145

----

## TLDR
###  เขียน view (แต่ละหน้า) ไว้ใน `src/views/pagename`
ลองดู folder `src/views/not-found`

  - `pagename.js` - หน้าหลักของ view เขียนโค้ดในนี้ แล้ว `export default PageName`
  - `index.js` - "re-export" pagename.js
```js/
    export { default } from './pagename';
```
  - `pagename.css` optional - เป็น css ของ page
  - เขียน component อื่นๆเพิ่มได้ ใส่ใน folder เดียวกัน
    - (เดี๋ยวค่อยแยกทีหลัง) เอา component ไปใส่ใน `src/components`

----

### components ควรเขียนใน `src/components/category/component-name`
โดยแบ่งเป็นกลุ่มๆ ตาม feature ลองดู folder `src/components/login/`

```
  src 
  |--components
  |   |---common <-- component ทั่วไป
  |   |  |--index.js <--- export component ทั้งหมดใน common จะได้ไม่ต้องไป import แยก 
  |   |  |
  |   |  |--navbar 
  |   |  |   index.js <--- export default เหมือนข้างบน
  |   |  |   navbar.js <--- code จริงๆของ component
  |   |  |   navbar-subcomponent.js <-- subcomponent (ถ้ามี)
  |   |  ---footer
  |   |      index.js <--- export default เหมือนข้างบน
  |   |      footer.css 
  |   |
  |   |--login  <-- component เกี่ยวกับหน้า login
         |--- index.js <--- export component ทั้งหมดใน login จะได้ไม่ต้องไป import แยก 
         |--- login-dialog
         |       index.js
         |       login-dialog.js
         |--- login-button
              ...
```

## naming
- class name - ใช้ `PascalCase`
  - ตั้งชื่อให้สื่อความหมายถึงประเภท
    - `LoginPage` -- หน้า login `/login`
    - `RegisterForm` -- component ที่เป็น form สำหรับ login
    - `ErrorDialog` -- dialog error
- filename ใช้  `kebab-case`
  - `login-form.js`
  - `not-found.js`
- ชื่อตัวแปรใช้ `camelCase` 
- constant ใช้ `SNAKE_CASE` (ตัวพิมพ์ใหญ่)
