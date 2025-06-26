const deleteBtn = document.querySelector(".btn-danger");

deleteBtn.addEventListener("click", (e) => {
  const output = prompt('Are you sure you want to delete? Type "yes" to confirm.');
  
  if (output && output.toLowerCase() === "yes") {
    // Allow the action to proceed
    return true;
  } else {
    // Prevent the default action
    e.preventDefault(); // Prevents form submission
    alert("Chat not deleted.");
    return false;
  }
});