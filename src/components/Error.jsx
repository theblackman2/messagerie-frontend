import styled from "styled-components";
import { RiCloseCircleFill } from "react-icons/ri";

function Error({ close }) {
  const logout = () => {
    localStorage.clear();
    window.location.reload(false);
  };
  return (
    <Container>
      <div className="card">
        <button onClick={close} className="close-btn">
          <RiCloseCircleFill />
        </button>
        <h2>Une erreur s'est produite</h2>
        <div className="trics">
          <h3>Quelques astuces</h3>
          <ul>
            <li>Vérifier si vous êtes connecté à internet</li>
            <li>Vous déconnecter et vous réconnecter</li>
          </ul>
        </div>
        <button onClick={logout} className="btn btn-danger">
          Se déconnecter
        </button>
      </div>
    </Container>
  );
}

export default Error;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);

  .card {
    width: 350px;
    padding: 1rem;
    height: 200px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 10px;
    position: relative;
    @media screen and (max-width: 400px) {
      width: 90%;
    }

    > h2 {
      font-size: 18px;
    }

    .trics {
      display: flex;
      flex-direction: column;
      gap: 10px;

      ul {
        margin-left: 1.5rem;
      }

      > h3 {
        font-size: 16px;
      }
    }

    .close-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;

      svg {
        font-size: 20px;
      }
    }
  }
`;
