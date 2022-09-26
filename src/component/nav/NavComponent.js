
import './main.css'
import styled from "styled-components";
import { FaBars, FaShoppingBag , FaCaretDown} from 'react-icons/fa';
const NavComponent = () =>{

    return(
        <Wrapper className="nav">
            <div className="nav-header">
               <p>Mern Store</p>
            </div>
            <div className="nav-toggle">
                <div className="nav-toggle-header">
                    <FaBars className="nav-icon"/>
                    <p className="nav-title">Mern Store</p>
                </div>
                <div >
                    <div className="nav-cart" >
                        <FaShoppingBag className="nav-icon"/>
                        <span className="item-count">1</span>
                    </div>
                    <div className="nav-links">
                        <div className="link-container">
                            <p>brand</p>
                            <FaCaretDown/>
                        </div>
                        <div className="link-container">
                            <p>shop</p>
                        </div>
                        <div className="link-container">
                            <p>shehan</p>
                            <FaCaretDown/>
                        </div>
                    </div>
                </div>

            </div>

            <div className="search-box-container">
                <input className="search-box" placeholder="search products"/>
            </div>

        </Wrapper>

    )
}
const Wrapper = styled.section`
  color : black;
  padding:2rem ;
  box-shadow :  0 0 20px 2px rgba(0,0,0,0.3);
  .nav-title{
    display: none;
  }
  .nav-toggle-header{
    display: flex;
    align-items: center
  }
  .nav-header{
    text-align: center;
    font-size : 1.5rem;
    margin : 0rem auto;
    font-weight: 600
  }
  .nav-toggle{
  display: flex;
  justify-content : space-between;
  align-items: center
  }
  .nav-icon{
    font-size: 1.5rem;
    margin : 1rem 0;
  }
  .nav-links{
     display: flex;
     justify-content : center
  }
  .link-container{
       display: flex;
       margin: 0 1rem
  }
  .search-box-container{
    text-align: center;
    padding: 1rem 1rem
    
  }
  .search-box{
    width : 100%;
    height: 3rem;
    margin : 1rem 0;
    border-radius : 1rem;
    border: 1px solid rgba(0,0,0,0.4);
    padding: 1rem;
    font-size: 1rem
  }
  .item-count{
    padding: 2px 6px;
    border-radius :  20px;
    background :  blue;
    position : absolute;
    right : -12px;
    top : 5px
    
  }
  .nav-cart{
    position: relative;
    
    span{
        color: white;
        font-size: 0.8rem
    }
  }
   @media (min-width: 776px) {
          .nav-header{display: none}
            .nav-title{
                display: inline-block;
                margin: 0 2rem;
            }
   }
  
`

export default NavComponent;
