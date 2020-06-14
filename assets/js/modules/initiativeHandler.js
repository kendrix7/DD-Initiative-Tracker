var initiativeHandler = function(buttonEl) {
    console.log(buttonEl);
    
    var initiativeList = [];
    initiativeList.push(buttonEl.text());
    buttonEl.remove();
    var modalContent = $(".modal-content").children().eq(1).text().trim();
    
    modalContent = modalContent.split(" ")
    modalContent.pop()
    modalContent = modalContent.join(" ");
    modalContent = `${modalContent} next?`;
    $(".modal-content p").text(modalContent);
}

export { initiativeHandler }