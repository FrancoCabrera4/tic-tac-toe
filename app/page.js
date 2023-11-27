"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { data } from "autoprefixer";

export default function Menu() {
    const [showRules, setShowRules] = React.useState(false);
    const [idValue, setIdValue] = React.useState("");
    const router = useRouter();

    function handleNewLocalGame() {
        router.push("/localgame");
    }

    function handleNewOnlineGame() {
        var id = -1;

        fetch("https://localhost:7128/game/create", {
            method: "POST",
        })
            .then((response) => {
                const data = response.json().then((resultApi) => {
                    id = resultApi;
                    router.push(`/onlinegame/${id}?created=true`);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleEnterOnlineGame(id) {
        console.log(id);

        fetch(`https://localhost:7128/game/join/${id}`, {
            method: "POST",
        })
            .then((response) => {
                console.log(response);
                const data = response.json().then((resultApi) => {
                    const id = resultApi;
                    router.push(`/onlinegame/${id}?created=false`);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleShowRules() {
        setShowRules(true);
    }

    function handleGoToMenu() {
        setShowRules(false);
    }
    return (
        <div className={`MainMenu overflow-hidden justify-between`}>
            <div
                className={`MainMenu-Menu ${
                    showRules == true ? "" : "justify-between"
                }`}
            >
                <h1 className="font-bold text-5xl text-center">
                    Welcome to Tic-Tac-Toe²
                </h1>

                {showRules == true ? null : (
                    <button
                        className="MainMenu-Button"
                        onClick={handleShowRules}
                    >
                        Show rules
                    </button>
                )}

                {showRules == true ? null : (
                    <button
                        className="MainMenu-Button"
                        onClick={handleNewLocalGame}
                    >
                        New Local Game
                    </button>
                )}
                {showRules == true ? null : (
                    <button
                        className="MainMenu-Button"
                        onClick={handleNewOnlineGame}
                    >
                        New Online Game
                    </button>
                )}
                {showRules == true ? null : (
                    <form
                        className="w-full flex justify-between"
                        onSubmit={(event) => event.preventDefault()}
                    >
                        <input
                            className="MainMenu-Input w-1/2"
                            onChange={(event) => setIdValue(event.target.value)}
                            value={idValue}
                            placeholder="#gameId"
                        ></input>
                        <button
                            className="MainMenu-Button w-1/2"
                            onClick={(event) =>
                                handleEnterOnlineGame(parseInt(idValue))
                            }
                        >
                            Enter Game
                        </button>
                    </form>
                )}

                {showRules && (
                    <div className="MainMenu-Rules flex flex-col ">
                        <div className="flex justify-between items-end">
                            <h1 className="text-3xl font-semibold">Rules</h1>
                            <button
                                className="font-semibold border-2 border-black rounded-xl p-1"
                                onClick={handleGoToMenu}
                            >
                                Menu
                            </button>
                        </div>
                        <ul className="MainMenu-Rules-RulesList flex flex-col justify-between flex-grow py-10 text-xl">
                            <li className="list-disc">
                                The first to make a 3 in a row in the big board
                                wins.
                            </li>
                            <li className="list-disc">
                                If 3 in a row are made in a small board then it
                                is marked in the big board
                            </li>
                            <li className="list-disc">
                                The previous play in a small board determines in
                                which small board will be played next
                            </li>
                            <li className="list-disc">
                                If the next board has already a winner then the
                                next move is a free one. This means that it can
                                be played in any square
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <img
                src="/GameImage-cropped.png"
                className={`GameImage ${
                    !showRules ? "" : "GameImageAnimation"
                }`}
            ></img>
        </div>
    );
}
