//SIDEBAR TOGGLE
var sidebarOpen =false;/*set a variable called sidebarOpen and default set to false*/
 /*In order to open and clos ethe side ba w need to give access to html element */
var sidebar=document.getElementById("sidebar"); /*js use DOM model we can use it to directly manipulate dom element
by this js can refernce to the html element through the id called sidebar*/

/*Define the opensidebar function*/
function openSideBar(){
    /*mention the arguments*/
    if (!sidebarOpen){
        /*check whether the side bar is currently open or not*/
        sidebar.classList.add("sidebar-responsive");
        sidebarOpen=true; /*If the sidebar is closed tell it to set the sidebarOpen into false*/
    }
}

function closeSidebar(){
    /* This function is used to close a
    sidebar by removing a CSS class and updating a boolean variable.*/
    if (sidebarOpen){/*It checks if the variable sidebarOpen is true.*/
        sidebar.classList.remove("sidebar-responsive");/*It uses the classList.remove() method
          to remove the CSS class "sidebar-responsive" from the sidebar element..*/
        sidebarOpen=false;/*It updates the sidebarOpen variable to false.*/
    }
}
