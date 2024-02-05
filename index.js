

const handleFileSelect = () => {
  const fileInput = document.getElementById("audioFile");
  const audioPreview = document.getElementById("audioPreview");

  const selectedFile = fileInput.files[0];

  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = function (e) {
      audioPreview.src = e.target.result;
    };

    reader.readAsDataURL(selectedFile);
  } else {
    audioPreview.src = "";
  }
};