$(document).ready(function() {
    
    // Some Variables that are required most of the time
    const txtNewTodo =  $('#txtNewTodo');
    const btnAddNewTodo = $('#btnAddNewTodo');

    // Add focus on adding todo txt field
    txtNewTodo.focus();


    // ADD NEW TODO TO THE TABLE
    btnAddNewTodo.on('click', function(){
        let newTodoToBeAdded = txtNewTodo.val();
        if(newTodoToBeAdded == ""){
            alert("Enter a todo");
            txtNewTodo.focus();
            return;
        }
        let currentTodoID = uniqueID();

        $('#tableBody').append('<tr>');
        
        $('#tableBody tr:last').append('<td>' + currentTodoID + '</td>');
        $('#tableBody tr:last').append('<td>' +newTodoToBeAdded + '</td>');
        $('#tableBody tr:last').append('<td> <input type="checkbox" name="todoCompletedCheck"> </td>').on("change", "td :checkbox", isTodoCompleted);
        $('#tableBody tr:last').append('<td> <input type="button" class="btnEdit" value="Edit Todo"> </td>').on("click", ".btnEdit", editTodo);
        $('#tableBody tr:last').append('<td> <input type="button" class="btnDelete" value="Delete Todo"> </td>').on("click", ".btnDelete", deleteTodo);


        // Reset ADD TODO input text
        txtNewTodo.val("");
        // Set focus on the ADD TODO input field again
        txtNewTodo.focus();

        showTodoFilter();
    });

   
    $(':checkbox').change(isTodoCompleted);

    $('#btnUpdateTodo').on('click', updateTodo);

    $('#btnCancelUpdateTodo').on('click', cancelUpdateTodo);

    $('#showTodoFilter').on('change', showTodoFilter);

});


// Todo ID Generator
let uniqueID = (function() {
    let id = 1;
    return function() { return id++; };  // Return and increment
})(); 


function isTodoCompleted(){
    if($(this).is(":checked")) {
        $(this).parent().prev().css({"text-decoration": "line-through"});
        showTodoFilter()
    }else{
        $(this).parent().prev().css({"text-decoration": "none"});
        showTodoFilter()
    }
}



 // Edit a todo
 let todoToBeEditedColumn;
 let todoRowToBeEdited;

function editTodo(){
    
    // Get the row which contains the todo to be updated and change the row color
    todoRowToBeEdited =  $(this).parent().parent();
    todoRowToBeEdited.css('background-color', '#ff8269');

    todoToBeEditedColumn = $(this).parent().prev().prev();
    let todoToBeEditedText = todoToBeEditedColumn.text();

    // show update div
    $('#updateTodoInputDiv').children().removeClass('hiddenInput');

    $('#txtUpdateTodo').val(todoToBeEditedText);
    $('#txtUpdateTodo').focus();

    disableInputsExceptUpdateDiv();
    
}

function updateTodo(){
    let txtUpdatedTodo = $('#txtUpdateTodo').val();
    todoToBeEditedColumn.text(txtUpdatedTodo);

    $('#updateTodoInputDiv').children().addClass('hiddenInput');

    todoToBeEditedColumn = null;

    enableInputs();

    todoRowToBeEdited.css('background-color', '#fff');
}

function deleteTodo() {
    $(this).parent().parent().remove();
} 


function cancelUpdateTodo() {
    $('#updateTodoInputDiv').children().addClass('hiddenInput');
    todoToBeEditedColumn = null;
    $('#txtUpdateTodo').val(null);

    enableInputs();

    todoRowToBeEdited.css('background-color', '#fff');
}

// Disable All inputs other than the update div inputs
function disableInputsExceptUpdateDiv(){
    $(txtNewTodo).attr("disabled", "disabled");
    $(btnAddNewTodo).attr("disabled", "disabled");
    $('.btnEdit').attr("disabled", "disabled");
    $('.btnDelete').attr("disabled", "disabled");
    $(':checkbox').attr("disabled","disabled");
    $('#showTodoFilter').prop("disabled", true);
}

function enableInputs() { 
    $(txtNewTodo).removeAttr('disabled');
    $(btnAddNewTodo).removeAttr('disabled');
    $('.btnEdit').removeAttr("disabled");
    $('.btnDelete').removeAttr("disabled");
    $(':checkbox').removeAttr("disabled");
    $('#showTodoFilter').prop("disabled", false);

}

// Filter Todo according to the drop down and show them in the table
function showTodoFilter(){
    let dropDownValue = $('#showTodoFilter').val();

    let checkboxArray = $('#tableBody').children('tr').children('td').children(':checkbox');

    if(dropDownValue === "completed"){
        // Show Completed TODOS
        checkboxArray.each(function () { 
            if($(this).is(':checked')){
                $(this).parent().parent().removeClass('hiddenInput');
            }else{
                $(this).parent().parent().addClass('hiddenInput');
            }
        });
    }else if(dropDownValue === "incomplete"){
        // Show Incomplete TODOS
        checkboxArray.each(function () { 
            if($(this).is(':checked')){
                $(this).parent().parent().addClass('hiddenInput');
            }else{
                $(this).parent().parent().removeClass('hiddenInput');
            }
        });
    }else{
        // Show All TODOS
        checkboxArray.each(function () { 
            if($(this).is(':checked')){
                $(this).parent().parent().removeClass('hiddenInput');
            }else{
                $(this).parent().parent().removeClass('hiddenInput');
            }
        });
    } 
}