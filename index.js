let audioContext;
let analyser;
let dataArray;

const handleFileSelect = () => {
  const fileInput = document.getElementById("audioFile");
  const audioPreview = document.getElementById("audioPreview");

  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioContext.createAnalyser();
  const source = audioContext.createMediaElementSource(audioPreview);

  source.connect(analyser);
  analyser.connect(audioContext.destination);

  analyser.fftSize = 256;
  dataArray = new Uint8Array(analyser.frequencyBinCount);

  const selectedFile = fileInput.files[0];

  audioPreview.style.display = "block";

  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = function (e) {
      audioPreview.src = e.target.result;
      audioPreview.addEventListener("canplay", () => {
        visualize();
      });
    };

    reader.readAsDataURL(selectedFile);
  } else {
    audioPreview.src = "";
  }
};

const visualize = () => {
  const gridItems = document.querySelectorAll(".grid-item");

  const draw = () => {
    requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    gridItems.forEach((item, index) => {
      const value = dataArray[index] / 4;
      console.log(value);
      item.style.backgroundColor =
        value === 0
          ? `rgb(255, ${255 - value}, 255)`
          : `rgb(0, ${255 - value}, 0)`;
    });
  };

  draw();
};
