const apiUrl = "https://localhost:5001/api/Employees"; // Update port if needed

// Fetch and display employees
const fetchEmployees = async () => {
    const response = await fetch(apiUrl);
    const employees = await response.json();
    const tableBody = document.querySelector("#employee-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    employees.forEach((employee) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.firstName}</td>
            <td>${employee.lastName}</td>
            <td>${employee.role}</td>
            <td>${new Date(employee.dateOfJoining).toLocaleDateString()}</td>
            <td>${employee.manager || "N/A"}</td>
            <td>
                <button class="delete" onclick="deleteEmployee(${employee.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

// Add new employee
const addEmployee = async (event) => {
    event.preventDefault();

    const employee = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        role: document.getElementById("role").value,
        dateOfJoining: document.getElementById("dateOfJoining").value,
        manager: document.getElementById("manager").value || null,
    };

    await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
    });

    fetchEmployees(); // Refresh employee list
    document.getElementById("add-employee-form").reset(); // Reset form
};

// Delete employee
const deleteEmployee = async (id) => {
    if (confirm("Are you sure you want to delete this employee?")) {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        fetchEmployees(); // Refresh employee list
    }
};

// Event listeners
document.getElementById("add-employee-form").addEventListener("submit", addEmployee);

// Initial fetch
fetchEmployees();
