// Connecting Ui to Js

// Sidebar Open Close Functionality
function sideBarOpenClose() {
    const sidebar = document.querySelector(".sidebar")
    const sidebarClose = document.querySelector(".sidebar-icon-close")
    const sidebarOpen = document.querySelector(".sidebar-icon-open")
    sidebarClose.addEventListener("click", () => {
    sidebar.classList.add("sidebar-closed")
    sidebarOpen.style.visibility = "visible"
    })

    sidebarOpen.addEventListener("click", () => {
    sidebar.classList.remove("sidebar-closed")
    sidebarOpen.style.visibility = "hidden"
    })
    
}

export { sideBarOpenClose }