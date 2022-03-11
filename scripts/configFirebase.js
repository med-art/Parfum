  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAjvvkSSwLzkEdlmlTwQAMVKnZTPl_kpRY",
    authDomain: "parfum-584b0.firebaseapp.com",
    databaseURL: "https://parfum-584b0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "parfum-584b0",
    storageBucket: "parfum-584b0.appspot.com",
    messagingSenderId: "150343612820",
    appId: "1:150343612820:web:bcaf183f9ed89f9feeb781"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = app.database();
  const ref = db.ref();
  const guest = ref.child('guest');
  // const response = ref.child('response'); // response list no longer in use.


  function logGuest(ident, a, g, r, l) {
    guest.child(ident).set({
        age: a,
        gender: g,
        region: r,
        lang: l
      })
      .then(() => {
        console.log("guest data uploaded successfully")
      })
      .catch((error) => {
        console.error("Error writing guest document: ", error)
      });
  }

  function logResponse(id, u, o, f, h, i) {
    guest.child(u).child(id).set({
        odourselection: o,
        Familiarity: f,
        Hedonicity: h,
        Intensity: i
      })
      .then(() => {
        console.log("odour response data uploaded successfully")
      })
      .catch((error) => {
        console.error("Error writing response document: ", error)
      });
  }

  function logColour(id, u, c) {
    guest.child(u).child(id).update({
        RGBACol: c,
      })
      .then(() => {
        console.log("colour response data uploaded successfully")
      })
      .catch((error) => {
        console.error("Error writing colour document: ", error)
      });
  }


  function logShape(id, u, s) {
    guest.child(u).child(id).update({
        qtyOfShapeVertices: s,
      })
      .then(() => {
        console.log("shape data uploaded successfully")
      })
      .catch((error) => {
        console.error("Error writing shape document: ", error)
      });
  }

  function logDrawing(id, u, d, w, h) {
    console.log(id, u, d, w, h);
    guest.child(u).child(id).update({
        drawingVertices: d,
        canvasWidth: w,
        canvasHeight: h
      })
      .then(() => {
        console.log("morphed shape vertices uploaded successfully")
      })
      .catch((error) => {
        console.error("Error writing shape vertex document: ", error)
      });
  }
