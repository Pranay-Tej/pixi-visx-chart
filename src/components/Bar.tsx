type Props = {
    x: number;
    y: number;
    width: number;
    height: number;
    fill?: string;
}

function Bar(props: Props) {
    const { x, y, width, height, fill = "hsl(207, 60%, 50%)" } = props;

    return <pixiGraphics 
        draw={(g) => {
            g.clear();
            g.rect(x, y, width, height);
            g.fill(fill);
        }}
    />
}

export default Bar;