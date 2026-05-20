  document.addEventListener('DOMContentLoaded', function(){  
        document.getElementById("btn").onclick = async () => {
            const response = await fetch("/api/message");
            const data = await response.json();

            document.getElementById("output").innerText =
                data.message;
        };
  });
