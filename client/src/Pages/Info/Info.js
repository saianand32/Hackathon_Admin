import React from 'react'
import './Info.css'
import greenrobot from '../../Assets/greenrobot.svg'
import greencard from '../../Assets/greencard.svg'
import greennote from '../../Assets/greennote.svg'
import greenpeople from '../../Assets/greenpeople.svg'

function Info() {
    return (
        <div className='infoContainer'>

            <h1>Why participate in <span style={{ color: "#44924C" }}>AI challenges?</span></h1>
            <div className='demicontainer'>
                <div className='info'>
                    <img src={greennote} alt="" />
                    <h2>Prove Your Skills</h2>
                    <p>Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions.</p>
                </div>
                <div className='info'>
                    <img src={greenpeople} alt="" />
                    <h2>Learn from Community</h2>
                    <p>One can look and analyze the solutions submitted by the other Data Scientists in the community and leam from them.</p>
                </div>
                <div className='info'>
                    <img src={greenrobot} alt="" />
                    <h2>Challenge yourself</h2>
                    <p>There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder.</p>
                </div>
                <div className='info'>
                    <img src={greencard} alt="" />
                    <h2>Earn recognition</h2>
                    <p>You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards.</p>
                </div>
            </div>

        </div>
    )
}

export default Info
