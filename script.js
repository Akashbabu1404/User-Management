const apiUrl = 'https://jsonplaceholder.typicode.com/users';

// DOM elements
const userList = document.getElementById('userList');
const addUserBtn = document.getElementById('addUserBtn');
const userForm = document.getElementById('userForm');
const cancelBtn = document.getElementById('cancelBtn');
const userFormFields = document.getElementById('userFormFields');
const saveUserBtn = document.getElementById('saveUserBtn');
const formTitle = document.getElementById('formTitle');

// Fetch and display users
function fetchUsers() {
    console.log('Fetching users...');
    axios.get(apiUrl)
        .then(response => {
            const users = response.data;
            userList.innerHTML = '';
            users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.classList.add('user-item');
                userDiv.innerHTML = `
                    <span>${user.name} (${user.email}) - ${user.company.name}</span>
                    <div>
                        <button onclick="editUser(${user.id})">Edit</button>
                        <button onclick="deleteUser(${user.id})">Delete</button>
                    </div>
                `;
                userList.appendChild(userDiv);
            });
        })
        .catch(error => {
            alert('Error fetching users');
            console.error(error);
        });
}

// Show the form to add a new user
addUserBtn.addEventListener('click', () => {
    console.log('Add User button clicked');
    userForm.style.display = 'block';
    formTitle.textContent = 'Add New User';
    saveUserBtn.textContent = 'Add User';
    userFormFields.reset();
    document.getElementById('userId').value = '';
});

// Cancel the form
cancelBtn.addEventListener('click', () => {
    userForm.style.display = 'none';
});

// Add a new user
userFormFields.addEventListener('submit', function(event) {
    event.preventDefault();

    const userId = document.getElementById('userId').value;
    const user = {
        name: document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        company: { name: document.getElementById('department').value },
    };

    if (userId) {
        // Edit existing user
        axios.put(`${apiUrl}/${userId}`, user)
            .then(response => {
                alert('User updated successfully');
                fetchUsers();
                userForm.style.display = 'none';
            })
            .catch(error => {
                alert('Error updating user');
                console.error(error);
            });
    } else {
        // Add new user
        axios.post(apiUrl, user)
            .then(response => {
                alert('User added successfully');
                fetchUsers();
                userForm.style.display = 'none';
            })
            .catch(error => {
                alert('Error adding user');
                console.error(error);
            });
    }
});

// Edit an existing user
function editUser(userId) {
    axios.get(`${apiUrl}/${userId}`)
        .then(response => {
            const user = response.data;
            document.getElementById('firstName').value = user.name.split(' ')[0];
            document.getElementById('lastName').value = user.name.split(' ')[1];
            document.getElementById('email').value = user.email;
            document.getElementById('department').value = user.company.name;
            document.getElementById('userId').value = user.id;

            userForm.style.display = 'block';
            formTitle.textContent = 'Edit User';
            saveUserBtn.textContent = 'Save Changes';
        })
        .catch(error => {
            alert('Error fetching user details');
            console.error(error);
        });
}

// Delete a user
function deleteUser(userId) {
    axios.delete(`${apiUrl}/${userId}`)
        .then(response => {
            alert('User deleted successfully');
            fetchUsers();
        })
        .catch(error => {
            alert('Error deleting user');
            console.error(error);
        });
}

// Initial call to fetch users
fetchUsers();
