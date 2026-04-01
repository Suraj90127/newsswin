
import React, { useCallback, useEffect, useState } from "react";
import { platformData, popularData } from "../lottery/AllgameData";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userDetail } from "../../../store/reducer/authReducer";
import debounce from "lodash/debounce";
import JilliPopup from "../../../components/JilliPopup";
import { jilliGame } from "../../../store/reducer/gameReducer";
import {
  gameList,
  gameListByGameType,
  launchGame,
} from "../../../store/reducer/spribeGameReducer";

const Popular = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { listTypeData, loader } = useSelector((state) => state.spribeGame);
  // console.log("listTypeData",);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jilliPopup, setJilliPopup] = useState(false);
  const [gameId, setGameId] = useState();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(18); // start with 18
  const [game_type, setGame_type] = useState("jili");

  const debouncedDispatch = useCallback(
    debounce(() => {
      dispatch(gameListByGameType({ game_type, page, size }));
    }, 300),
    [dispatch, game_type, page, size]
  );

  useEffect(() => {
    debouncedDispatch();
  }, [debouncedDispatch]);

  const handleJilliOpen = (data) => {
    setGameId(data);
    setJilliPopup(true);
  };

  // const handleJilliSubmit = () => {
  //   if (!userInfo) {
  //     navigate("/login");
  //   } else {
  //     if (userInfo?.isdemo === 0) {
  //       let playerid = userInfo?.phone_user;
  //       dispatch(launchGame({ playerid, gameId })).then((res) => {
  //         if (res.payload.status) {
  //           window.location.href = res.payload.data.launch_view_url;
  //           setJilliPopup(false);
  //         }
  //       });
  //     }
  //   }
  // };

  const handleViewMore = () => {
    // navigate with params or query (optional)
    navigate("/home/AllOnlineGames", { state: { game_type, page: 1, size: 1000 } });
  };

  return (
    <>
      {gameId && <JilliPopup gameId={gameId} />}

      

      {/* Heading with View More Button */}
      <div className="flex justify-between items-center mt-2">
        <h4 className="border-after text-white font-bold border-l-4 border-[#c4933f] pl-1">
          Popular
        </h4>
        <button
          onClick={handleViewMore}
          className="text-sm text-[#c4933f] hover:underline"
        >
          View More →
        </button>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-12 gap-3 mt-2">
        {listTypeData &&
          listTypeData.slice(0, 20).map((items, i) => ( // show only first 20
            <div className="col-span-4 mb-2" key={i}>
              <div className="bg-home-lg rounded-lg">
                <img
                  src={items.icon}
                  alt=""
                  loading="lazy"
                  className="w-full rounded-lg p-1 h-[12vh]"
                  onClick={() => handleJilliOpen(items.game_uid)}
                />
              </div>
              <p className="fs-sm bg-color-l text-black mt-2 font-semibold rounded-s-md p-1 ps-2">
                odds of{" "}
                <span className="ms-2">
                  {Number(items.id / 11.3).toFixed(2)}%
                </span>
              </p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Popular;
