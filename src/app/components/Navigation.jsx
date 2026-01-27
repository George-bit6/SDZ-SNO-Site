import Button from "./Button"

export default function Navigation(){

    return <nav>
        <Button className="bg-amber-400" text="Church"></Button>
        <Button text="Sections"></Button>
        <Button text="About Us"></Button>
        <Button text="Log Out"></Button>
    </nav>

}