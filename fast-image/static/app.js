document.addEventListener("DOMContentLoaded", () => {

    const fileInput = document.getElementById("fileInput");

    fileInput.addEventListener("change", async (event) => {

        const file = event.target.files[0];

        if (!file) return;

        // 1. pedir signed POST
        const response = await fetch("/api/presigned-post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                file_name: file.name,
                file_type: file.type
            })
        });

        const presigned = await response.json();

        console.log(presigned);

        // 2. construir multipart/form-data
        const formData = new FormData();

        // IMPORTANTISIMO:
        // agregar TODOS los fields primero

        Object.entries(presigned.fields).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // al final el archivo
        formData.append("file", file);

        // 3. subir directo a S3
        const uploadResponse = await fetch(presigned.url, {
            method: "POST",
            body: formData
        });

        if (uploadResponse.ok) {
            console.log("Archivo subido correctamente");
        } else {
            console.error("Error upload");
        }
    });

});
