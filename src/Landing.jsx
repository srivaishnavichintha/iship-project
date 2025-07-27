 import "./Landing.css" 
 import { Link } from "react-router-dom";
import Icongrid from "./Icongrid"
import peertopeer from  "./assets/2code.png"
 export default function Landing(){
    return(
        <>
            <div className="about"> 
                <nav >
                    <img></img>
                    <ul className="nav_bar">
                        <li><a href="#land-exp" >Explore</a></li>
                        <li> <a href="#land-pro" >Product</a></li>
                        <li> <a href="#land-comp" >Compiler</a></li>
                        <li><Link to="/login">Sign in</Link></li>
                    </ul>
                </nav>
                <div className="land-content">
                    <div>
                       <h1>
                            <strong>Learn</strong>, <strong>Compete</strong>, <strong>Level Up</strong>.
                       </h1>
                         <p>Master coding through peer challenges, mentor-led contests, and a dynamic leaderboard — all in one collaborative platform.</p>
                    </div>
                    <Icongrid />
                </div>
            </div>
            <div id="land-exp" className="land-explore">
                <div className="floating">
                    <div className="float-box box1" style={{ animationDelay: "0s" }}></div>
                    <div className="float-box box2" style={{ animationDelay: "0.5s" }}></div>
                    <div className="float-box box3" style={{ animationDelay: "1s" }}>
                         <img src={peertopeer} alt="peer coding" />
                    </div>
                    <div className="float-box box4" style={{ animationDelay: "1.5s" }}></div>
                </div>

                <div  className="explore-data">
                      <h2>Start Exploring</h2><br></br><br></br>
                      <p>An engaging platform that helps you grow through peer challenges, mentor contests, and a leaderboard — guiding your journey to the next level.</p>
                      <br></br>
                      <a > <Link to="/login">Get Started</Link></a>
                </div>
            </div>
            <div id="land-pro" className="product">
                    <div className="product-left-card">
                        <h2>Challenges, Community & Leaderboard</h2><br></br>
                        <p>Over 1000 challenges designed to help you practice, compete, and grow. Join a vibrant community of students, challenge peers at your level, and climb the leaderboard as you learn and earn rewards through mentor-led contests.</p>
                        <br></br><br></br>
                        <a href="">view leader board</a>
                    </div>
                    <div className="product-right-card">
                        <h2>Mentors & Skill Building</h2><br></br>
                        <p>Not only does this platform help students improve their coding and problem-solving skills, it also enables mentors to guide and assess students of all levels. From hosting contests to monitoring progress and rewarding achievements, it’s a complete learning and competitive ecosystem.</p>
                        <br></br>
                        <a href="">view courses</a>
                    </div>
            </div>
            <div id="land-comp" className="land-compiler">
               <div className="comp">
                <h2>Compiler</h2><br></br>
                <p>Our platform empowers students to learn and improve through engaging peer challenges, mentor-led contests, and a dynamic leaderboard. Practice, compete, and measure your progress — all in one collaborative space designed for growth.</p>
               </div><br></br>
               <div className="comp-div"></div>
            </div>
            <div className="land-about">
                <h2>We believe learning is better when shared.</h2>
                <br></br>
                <p>With peer challenges, mentor-led contests, and a dynamic leaderboard, we create a space where students unlock their potential. Competing, learning, and growing together, they build skills, track progress, and achieve their goals as a community.</p>
            </div>
        </>
    )
  }