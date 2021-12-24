import React, { useState } from 'react';
import Context from './Context';
import SectionCard from './SectionCard/SectionCard';
import SectionNavbar from './SectionNavbar/SectionNavbar';
import './sections.css';

const Sections = () => {
    let elements = document.getElementsByClassName('card-inner-wrapper');
    let btns = document.getElementsByClassName('btn-custom')
    const [activeList, setactiveList] = useState(true)
    const viewGridHandler = () => {

        for (let i = 0; i < elements.length; i++) {
            elements[i].style.width = '33%';
        }

        for (let i = 0; i < btns.length; i++) {
            btns[i].style.width = '10%';
            btns[i].style.marginRight = '5px'

        }

        setactiveList(false)


    }
    const viewListHandler = () => {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.width = '100%';
        }
        for (let i = 0; i < btns.length; i++) {
            btns[i].style.width = '100%';
        }

        setactiveList(true)
    }
    return (
        <Context.Provider value={
            { viewGridHandler, viewListHandler, activeList }
        }>
            <>
                <section className="section-navbar">
                    <SectionNavbar />
                </section>

                <section className="cards-section">
                    <div className="row cards-wrapper">
                        <SectionCard />
                    </div>
                </section>

            </>
        </Context.Provider>
    )
}

export default Sections
