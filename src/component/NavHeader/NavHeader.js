
import styled from 'styled-components'
import { FaPhone, FaTruck, FaWallet } from 'react-icons/fa';
const NavHeader  = () => {
    return(
        <Wrapper >
            <div className="phone-area">
                <FaTruck className="header-icon"/>
                <p> free Shipping </p>
            </div>

            <div className="phone-area">
                <FaWallet className="header-icon"/>
                <p> payment methods </p>
            </div>
            <div className="phone-area">
                <FaPhone className="header-icon"/>
                <p> call us 111-111-1111 </p>
            </div>

        </Wrapper>
    )
}
const Wrapper = styled.section`
  background: black;
  color : white;
  display : flex ;
  justify-content : space-between;
  align-items : center;
  padding : 1rem 2rem;
  .header-icon{
    margin : 0 0.5rem;
  }
  .phone-area{
    display:flex
    align-items:start;
    
  }
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`
export default NavHeader
