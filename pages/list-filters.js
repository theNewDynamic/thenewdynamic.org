var options = {
  valueNames: [ 'name','slug' , 'summary', 'date', 'tool', 'tool1', 'tool2', 'tool3', 'tool4', 'tool5', 'source', 'video', 'type', 'recommended'],
  listClass: 'filter-list',  
  plugins: [ ListPagination({ paginationClass: "pagination-list" }) ], 
  page: 200 // how many items should first show up on the page - affects performance
};

var linksList  = new List('filter-container', options);
var toolsList  = new List('filter-container2', options);


if (document.getElementById("filter-News")) {
    document.getElementById("filter-News").onclick=function(){
            linksList.filter(function(item) {
               if (item.values().type == "News" ) {
                 return true;
                 } else {
                 return false;
              }
          });
        };
      }

if (document.getElementById("filter-Tutorial")) {
    document.getElementById("filter-Tutorial").onclick=function(){
            linksList.filter(function(item) {
               if (item.values().type == "Tutorial" ) {
                 return true;
                 } else {
                 return false;
              }
          });
        };
      }
if (document.getElementById("filter-Review")) {
    document.getElementById("filter-Review").onclick=function(){
            linksList.filter(function(item) {
               if (item.values().type == "Review" ) {
                 return true;
                 } else {
                 return false;
              }
          });
        };
      }

if (document.getElementById("filter-Article")) {
    document.getElementById("filter-Article").onclick=function(){
            linksList.filter(function(item) {
               if (item.values().type == "Article" ) {
                 return true;
                 } else {
                 return false;
              }
          });
        };
      }
if (document.getElementById("filter-Resource/Website")) {
document.getElementById("filter-Resource/Website").onclick=function(){
      linksList.filter(function(item) {
         if (item.values().type == "Resource/Website" ) {
           return true;
           } else {
           return false;
        }
    });
  };
}

if (document.getElementById("filter-Video/Presentation")) {
    document.getElementById("filter-Video/Presentation").onclick=function(){
            linksList.filter(function(item) {
               if (item.values().type == "Video/Presentation" ) {
                 return true;
                 } else {
                 return false;
              }
          });
        };
      }
if (document.getElementById("filter-Recommended")) {
    document.getElementById("filter-Recommended").onclick=function(){
            linksList.filter(function(item) {
               if (item.values().recommended == "Recommended" ) {
                 return true;
                 } else {
                 return false;
              }
          });
        };
      }

if (document.getElementById("filter-static-site-generator")) {
    document.getElementById("filter-static-site-generator").onclick=function(){
            toolsList.filter(function(item) {
               if (item.values().type == "Static Site Generator" ) {
                 return true;
                 } else {
                 return false;
              }
          });
        };
      }

if (document.getElementById("filter-deployment")) {
    document.getElementById("filter-deployment").onclick=function(){
            toolsList.filter(function(item) {
               if (item.values().type == "Hosting/Deployment" ) {
                 return true;
                 } else {
                 return false;
              }
          });
        };
      }
if (document.getElementById("filter-other")) {
    document.getElementById("filter-other").onclick=function(){
            toolsList.filter(function(item) {
               if (item.values().type == "Other" ) {
                 return true;
                 } else {
                 return false;
              }
          });
        };
      }



if (document.getElementById("filter-none")) {
     document.getElementById("filter-none").onclick=function(){
         linksList.filter();
        };
      }
