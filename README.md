# group-project-fall2022-comp7980-group-teamabp

COMP7980 Group Project <br>
Team: ABP <br>
We use the 1st letter of group members' English name (Ada, Ben & Princeton) for the team name. <br>

<h1>Topic: Secondary School Profiles</h1>
<br>

<h2>Group members / SID / Area: </h2>
<b>Lam Chak Fung, Ben/ 21448426 / Mobile (Ionic App)</b><br>
<b>Poon Yuen Mei, Ada / 21469393 / Front-end (Vue CLI)</b> <br>
<b>Wong Tsz Fung, Princeton / 22465804 / Backend (Express)</b><br>

<h3>Notes from backend:</h3><br>
----To setup express backend, run:<br>

cd express <br>
npm install mongodb <br>
npm start <br>
<br>
You can then access server at http://localhost:3000/ <br>

<h3><i>Important points</i></h3><br>
---apexchart.js is created. <br>
This can be easily imported to show an interactive sortable stacked column chart on real data. <br>
Example usage: see /express/public/apexchart-example.html <br>
<br>

---hkmap.js is created.<br>
This can be easily imported to show an clickable hong kong map on real data. <br>
Example usage: see /express/public/amcharts-hkmap.html <br>
<br>

---RESTful API<br>
Allow basic CRUD actions.<br>
Allow searching, some with exact match, some with regex match<br>
Internal usage methods are also created. BE CAREFUL.<br>
Example usage: see /express/routes/index.js<br>

<h3>Notes from frontend:</h3><br>
----To setup the frontend "VueCli", run:<br>
npm install<br>
npm install bootstrap<br>
npm install @amcharts/amcharts5<br>
npm install @amcharts/amcharts5-geodata<br>
npm install --save apexcharts<br>
npm install --save vue3-apexcharts<br>
npm run serve<br>
<br>
You can access the website at <a href="http://localhost:8080" target="_blank">http://localhost:8080</a><br>
<br>
<h3><i>Important points</i></h3><br>
---The frontend is built based on the backend.<br>
<br>
---Bootstrap is applied for all webpages so the image and text is displayed based on the screen size. <br>
<br>
---Navigation bar is created for easier to find the webpage. <br>
You can find the navigation bar on the top of each webpage. <br>
<br>
---Bar chart, donut chart and map are used for visualization. <br>
<br>
The link of bar chart is <a href="http://localhost:8080/barChart" target="_blank">http://localhost:8080/barChart</a><br>
The link of map is <a href="http://localhost:8080/map" target="_blank">http://localhost:8080/map</a><br>
The link of donut chart is <a href="http://localhost:8080/chart" target="_blank">http://localhost:8080/chart</a><br>
<br>
---Two search forms are created for users to select multiple criteria to find the accurate information.<br>
The link of general search is <a href="http://localhost:8080" target="_blank">http://localhost:8080</a><br>
The link of advanced search is <a href="http://localhost:8080/advancedsearch" target="_blank">http://localhost:8080/advancedsearch</a><br>
<br>
---Pagination is added for search result. <br>
<br>

<h3>Notes from mobile app:</h3><br>
----To setup the mobile app "Ionic", run:<br>
npx @ionic/cli start shoppingApp tabs --type vue <br>
npx @ionic/cli serve <br>
<br>
<h3><i>Important points</i></h3><br>
---The app content is created based on the VueCli. <br>
