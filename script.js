const form = document.getElementById('registerForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const student = {
    name: form.name.value,
    email: form.email.value,
    course: form.course.value
  };

  try {
    const res = await fetch('http://localhost:5000/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student)
    });

    if (res.ok) {
      alert('Student registered successfully!');
      form.reset(); // Clear the form
    } else {
      const data = await res.json();
      alert(data.message || 'Error registering student.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Server error. Please try again later.');
  }
});
