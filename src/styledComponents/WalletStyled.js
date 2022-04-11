import styled from 'styled-components';

const WalletStyled = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
text-align: center;


header {
    display: flex;
    align-items: center;
    margin-top: 20px;
    font-size: 25px;


    div {
      margin: 20px;
    }

}

svg {
  color: red;
  height: 30px;
  width: 30px;
  cursor: pointer;
  transition: transform 0.4s;
}

svg:hover {
  transform: scale(1.3);
}


form {
  margin-top: 50px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  margin-bottom: 30px;
}

.form-label {
  margin-right: 15px;
  margin-left: 30px;
}

.form-control {
    width: 150px;
}

`;

export default WalletStyled;
