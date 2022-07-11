import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";

function Navbar() {
  return (
    <Header>
      <Divright>
        <img src="/images/blogger.png" alt="" />
      </Divright>

      <Divleft>
        <SearchIcon />
        <GroupIcon />
        <NotificationsIcon />
      </Divleft>
    </Header>
  );
}

const Header = styled.nav`
  background-color: black;
  color: white;
  padding: 10px;
  min-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 2vw;
`;

const Divright = styled.div`
  padding-left: 10px;
  img {
    height: 24px;
  }
`;

const Divleft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 9rem;
`;

export default Navbar;
