document.getElementById('ticketForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // รับค่าจากฟอร์ม
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const date = document.getElementById('date').value;
  const passengers = document.getElementById('passengers').value;

  // สร้างผลลัพธ์จำลอง
  const resultsDiv = document.getElementById('ticketResults');
  resultsDiv.innerHTML = `
    <div class="ticket">
      <p><strong>From:</strong> ${from}</p>
      <p><strong>To:</strong> ${to}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Passengers:</strong> ${passengers}</p>
      <button>Book Now</button>
    </div>
  `;

  // แสดงผลลัพธ์
  document.querySelector('.results-section').style.display = 'block';
});
