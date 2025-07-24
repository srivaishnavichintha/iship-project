import "./Practice_data.css"
export default function Practice_data() {
    return (
        <div className="dash">
            <div id="Companytags"> 
                <h3>Company wise problems</h3>
                <button>Amazon</button>
                <button>Google</button>
                <button>Microsoft</button>
                <button>Flipkart</button>  
                <button>Adobe</button>
                <button>Netflix</button>
            </div>
            <div className="problemsdata">
                <h1>Problems</h1>
                <div className="coding_data">
                    <div className="c1">
                        <h4>1</h4>
                        <h4>Adding two numbers</h4>
                    </div>
                    <div className="c2">
                        <p>Easy</p>
                        <p>10%</p>
                        <button>Solve Challenge</button>
                    </div>
                </div>
                <div className="coding_data">
                    <div className="c1">
                        <h4>2</h4>
                        <h4>Reverse a string</h4>
                    </div>
                    <div className="c2">
                        <p>Easy</p>
                        <p>15%</p>
                        <button>Solve Challenge</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
