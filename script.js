var apiURL="https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json";
let pageSize=10;
let currentPage=1;
let personal_details=[];


async function getData(){
    const response = await fetch(apiURL);        
    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        else{
            return await response.json();
            }
        }
        getData().then((data)=>{
            personal_details=data;
            console.log(personal_details)
            }).catch((error)=>console.log("Error",error))


            async function renderTable(){
                await getData()
            
                var details="";
                //console.log(personal_details)
                personal_details.filter((row,index)=>{
                    let start=(currentPage-1)*pageSize;
                    let end=currentPage*pageSize;
            
                    if(index >= start && index < end) return true;
                }).forEach(personal_details => {
                    details += "<tr>"
                    details += `<td>${personal_details.id}</td>`
                    details += `<td>${personal_details.name}</td>`
                    details += `<td>${personal_details.email}</td>`
                    "<tr>"
                })
                document.getElementById("listItems").innerHTML=details
            }
            renderTable();


            function previousPage(){
                if (currentPage > 1) 
                    --currentPage;
                    renderTable();
            }
            function nextPage(){
                if((currentPage*pageSize)<personal_details.length)
                currentPage++;
                renderTable();
            }
