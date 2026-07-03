import React, { useState } from 'react';
import './App.css';

function App() {
  var [age, setAge] = useState("");
  var [sex, setSex] = useState("1"); 
  var [cp, setCp] = useState("0");   
  var [trestbps, setTrestbps] = useState("");
  var [chol, setChol] = useState("");
  var [fbs, setFbs] = useState("0"); 
  var [restecg, setRestecg] = useState("");
  var [thalach, setThalach] = useState("");
  var [exang, setExang] = useState("0"); 
  var [oldpeak, setOldpeak] = useState("");
  var [slope, setSlope] = useState("");
  var [ca, setCa] = useState("");
  var [thal, setThal] = useState("");

  var [result, setResult] = useState(null);

  // Hardcoded statistical anchors from the UCI Dataset baseline
  var DEFAULTS = {
    age: 60,
    sex: 1,
    cp: 0,
    trestbps: 137.5,
    chol: 234.5,
    fbs: 0,
    restecg: 1,
    thalach: 162,
    exang: 0,
    oldpeak: 1.15,
    slope: 2,
    ca: 0,
    thal: 2
  };

  // Verified Negative Case (Target 0) from UCI Dataset
  var injectDatasetHealthy = function() {
    setAge("54");
    setSex("1");    
    setCp("0");      
    setTrestbps("110");
    setChol("239");
    setFbs("0");
    setRestecg("1");
    setThalach("126");
    setExang("1");
    setOldpeak("2.8");
    setSlope("1");
    setCa("1");
    setThal("3");
    setResult(null);
  };

  // Verified Positive Case (Target 1) from UCI Dataset
  var injectDatasetRisk = function() {
    setAge("63");
    setSex("1");    
    setCp("3");      
    setTrestbps("145");
    setChol("233");
    setFbs("1");
    setRestecg("0");
    setThalach("150");
    setExang("0");
    setOldpeak("2.3");
    setSlope("0");
    setCa("0");
    setThal("1");
    setResult(null);
  };

  var handleSubmit = function(e) {
    e.preventDefault();

    var finalAge = age === "" ? DEFAULTS.age : parseFloat(age);
    var finalSex = parseInt(sex);
    var finalCp = parseInt(cp);
    var finalTrestbps = trestbps === "" ? DEFAULTS.trestbps : parseFloat(trestbps);
    var finalChol = chol === "" ? DEFAULTS.chol : parseFloat(chol);
    var finalFbs = parseInt(fbs);
    var finalRestecg = restecg === "" ? DEFAULTS.restecg : parseInt(restecg);
    var finalThalach = thalach === "" ? DEFAULTS.thalach : parseFloat(thalach);
    var finalExang = parseInt(exang);
    var finalOldpeak = oldpeak === "" ? DEFAULTS.oldpeak : parseFloat(oldpeak);
    var finalSlope = slope === "" ? DEFAULTS.slope : parseInt(slope);
    var finalCa = ca === "" ? DEFAULTS.ca : parseInt(ca);
    var finalThal = thal === "" ? DEFAULTS.thal : parseInt(thal);

    if (finalAge < 0 || finalAge > 120) { alert("Invalid Input: Age must be between 0 and 120."); return; }
    if (finalTrestbps < 50 || finalTrestbps > 250) { alert("Invalid Input: Resting Blood Pressure must be between 50 and 250 mm Hg."); return; }
    if (finalChol < 50 || finalChol > 600) { alert("Invalid Input: Serum Cholesterol must be between 50 and 600 mg/dl."); return; }
    if (finalRestecg < 0 || finalRestecg > 2) { alert("Invalid Input: Resting ECG Results must be between 0 and 2."); return; }
    if (finalThalach < 50 || finalThalach > 250) { alert("Invalid Input: Max Heart Rate must be between 50 and 250 bpm."); return; }
    if (finalOldpeak < 0.0 || finalOldpeak > 10.0) { alert("Invalid Input: ST Depression (oldpeak) must be between 0.0 and 10.0."); return; }
    if (finalSlope < 0 || finalSlope > 2) { alert("Invalid Input: Slope of Peak Exercise ST must be between 0 and 2."); return; }
    if (finalCa < 0 || finalCa > 4) { alert("Invalid Input: Number of Major Vessels must be between 0 and 4."); return; }
    if (finalThal < 0 || finalThal > 3) { alert("Invalid Input: Thalassemia Status must be between 0 and 3."); return; }

    var payload = {
      age: finalAge,
      sex: finalSex,
      cp: finalCp,
      trestbps: finalTrestbps,
      chol: finalChol,
      fbs: finalFbs,
      restecg: finalRestecg,
      thalach: finalThalach,
      exang: finalExang,
      oldpeak: finalOldpeak,
      slope: finalSlope,
      ca: finalCa,
      thal: finalThal
    };

    fetch('https://heart-disease-backend-131h.onrender.com/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(function(res) { return res.json(); })
    .then(function(data) { setResult(data.target); })
    .catch(function(err) { console.error(err); alert("Backend connection failed."); });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="glow-effect"></div>
        
        <div className="toolbar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', gap: '10px' }}>
          <h2>Heart Disease Predictor</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="button" onClick={injectDatasetHealthy} className="demo-btn" style={{ borderColor: '#10B981', color: '#10B981' }}>
              Load Healthy
            </button>
            <button type="button" onClick={injectDatasetRisk} className="demo-btn" style={{ borderColor: '#EF4444', color: '#EF4444' }}>
              Load Risky
            </button>
          </div>
        </div>
        
        <h3 className="subtitle">Enter patient metrics below.</h3>
        <hr className="divider" />
        
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Age (Years):</label>
              <input type="number" value={age} placeholder="age" onChange={function(e){setAge(e.target.value)}} />
            </div>
            
            <div className="form-group">
              <label>Sex / Gender:</label>
              <select value={sex} onChange={function(e){setSex(e.target.value)}}>
                <option value={1}>Male</option>
                <option value={0}>Female</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Chest Pain Type:</label>
              <select value={cp} onChange={function(e){setCp(e.target.value)}}>
                <option value={0}>0: Asymptomatic</option>
                <option value={1}>1: Typical Angina</option>
                <option value={2}>2: Atypical Angina</option>
                <option value={3}>3: Non-Anginal Pain</option>
              </select>
            </div>

            <div className="form-group">
              <label>Resting Blood Pressure (mm Hg):</label>
              <input type="number" step="0.1" value={trestbps} placeholder="trestbps" onChange={function(e){setTrestbps(e.target.value)}} />
            </div>

            <div className="form-group">
              <label>Serum Cholesterol (mg/dl):</label>
              <input type="number" step="0.1" value={chol} placeholder="chol" onChange={function(e){setChol(e.target.value)}} />
            </div>
            
            <div className="form-group">
              <label>Fasting Blood Sugar &gt; 120 mg/dl:</label>
              <select value={fbs} onChange={function(e){setFbs(e.target.value)}}>
                <option value={0}>False (Normal)</option>
                <option value={1}>True (Elevated)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Resting ECG Results (0-2):</label>
              <input type="number" value={restecg} placeholder="restecg" onChange={function(e){setRestecg(e.target.value)}} />
            </div>

            <div className="form-group">
              <label>Max Heart Rate Achieved (bpm):</label>
              <input type="number" step="0.1" value={thalach} placeholder="thalach" onChange={function(e){setThalach(e.target.value)}} />
            </div>
            
            <div className="form-group">
              <label>Exercise Induced Angina:</label>
              <select value={exang} onChange={function(e){setExang(e.target.value)}}>
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label>ST Depression (oldpeak):</label>
              <input type="number" step="0.01" value={oldpeak} placeholder="oldpeak" onChange={function(e){setOldpeak(e.target.value)}} />
            </div>

            <div className="form-group">
              <label>Slope of Peak ST (0-2):</label>
              <input type="number" value={slope} placeholder="slope" onChange={function(e){setSlope(e.target.value)}} />
            </div>

            <div className="form-group">
              <label>Major Vessels Colored (0-4):</label>
              <input type="number" value={ca} placeholder="ca" onChange={function(e){setCa(e.target.value)}} />
            </div>

            <div className="form-group">
              <label>Thalassemia Status (0-3):</label>
              <input type="number" value={thal} placeholder="thal" onChange={function(e){setThal(e.target.value)}} />
            </div>
          </div>

          <div className="info-notice">
            Note: Any unfilled metrics will automatically inherit the median or mode benchmark profiles calculated directly from the original <a href="https://archive.ics.uci.edu/dataset/45/heart+disease" target="_blank" rel="noopener noreferrer">UCI Heart Disease Dataset</a>.
          </div>
          
          <button type="submit" className="submit-btn">Execute ML Analysis</button>
        </form>

        {result !== null && (
          <div className={result === 1 ? 'result-box danger' : 'result-box success'}>
            <h3>Classification Target Value: {result ? "True" : "False"}</h3>
            <p>{result === 1 ? 'Risk Warning: The model predicts the given patient profile patterns with a possibility of an active heart disease.' : 'Profile Clear: The analysis indicates the given patient metrics are inconsistent with heart disease parameters.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;