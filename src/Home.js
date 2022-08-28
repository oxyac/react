import {Link} from "react-router-dom";

export function Home() {
    return (
        <>
            <main>
                <h2>Welcome to the homepage!</h2>
            </main>
            <nav>
                <Link to="/">About</Link>
            </nav>
        </>
    );
}
