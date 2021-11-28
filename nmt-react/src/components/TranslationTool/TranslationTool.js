import React, { useState, useEffect } from 'react';
import './TranslationTool.scss'
import axios from 'axios';
import styled from 'styled-components';


// import styled from 'styled-components';
const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  &:disabled {
    color: grey;
    opacity: 0.7;
    cursor: default;
  }
`;
const ButtonToggle = styled(Button)`
  opacity: 0.6;
  ${({ active }) =>
    active &&
    `
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;
const types = ['Polish', 'Esthonian'];

const WAIT_INTERVAL = 700;

const TranslationTool = () => {

    const [value, setValue] = useState("");
    const [timer, setTimer] = useState(null);
    const [output, setOutput] = useState("");
    const [active, setActive] = useState(types[0]);

    useEffect(() => {
        const translateRequest = () => {
            if (value !== "") {
                axios.post('http://localhost:5000/translate', {
                    uuid: 'ABCDEF1234',
                    source: value,
                    language: active
                })
                .then(function (response) {
                    setOutput(response.data.output);
                })
                .catch(function (error) {
                    console.log(error);
                });
            } else {
                setOutput("");
            }
        };
        setTimer(setTimeout(translateRequest, WAIT_INTERVAL));
        // eslint-disable-next-line 
    }, [value],[active]);

    
    const handleOnChange = (event) => {
        clearTimeout(timer);
        setValue(event.target.value);
    };


    return (
        <div className="block -purple edge--top--reverse">
            <div className="fluid-container">
                <h1>Translation tool</h1>
                <p>Low Resource Language to Chinese</p>
                <ButtonGroup>
                    {types.map(type => (
                        <ButtonToggle key={type} active={active === type} onClick={()=>setActive(type)}>{type}</ButtonToggle>
                    ))}
                </ButtonGroup>
                <form>
                    <div className="form-row pb-5 px-5">
                        <div class="col-md py-2">
                            <textarea 
                                class="form-control translate-textarea"
                                placeholder="Polish"
                                rows="6"
                                value={value}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div class="col-md pt-2">
                            <textarea class="form-control translate-textarea" 
                                placeholder="Chinese"
                                rows="6"
                                value={output}
                                readOnly 
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TranslationTool;