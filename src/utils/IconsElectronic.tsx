interface Props {
  className?: any;
  onClick?: VoidFunction;
}

export function Resistor(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      viewBox="100 200 314.092 200"
      {...props}
    >
      <path
        d="m100 299.989 29.464.011 40.994-100 29.618 200 42.122-200 37.151 200L316.5 200l36.881 200 31.017-100h29.694"
        style={{
          fill: "none",
          stroke: "#ffffff",
          strokeWidth: 14,
          strokeLinecap: "round",
        }}
      />
    </svg>
  );
}

export function DCPower(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={50}
      viewBox="118.43 100 66.755 112.811"
      {...props}
    >
      <path
        d="M118.43 157.304h26.236M145.663 100v112.811M164.152 131.088l-.17 53.275M185.185 156.9l-21.033.404M123.868 114.529h14.464M130.945 108.066v13.133M164.576 115.592h12.561"
        style={{
          fill: "#ffffff",
          stroke: "#ffffff",
          strokeWidth: 5,
          strokeLinecap: "round",
        }}
      />
    </svg>
  );
}

export function SwitchOpen(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={50}
      height={50}
      viewBox="98.912 173.206 101.394 54.339"
      {...props}
    >
      <path
        d="m98.912 199.747 26.638.253"
        style={{
          fill: "#d8d8d8",
          stroke: "#ffffff",
          strokeWidth: 4,
        }}
      />
      <ellipse
        cx={130.399}
        cy={200.155}
        rx={5.87}
        ry={5.603}
        style={{
          strokeWidth: 4,
          stroke: "#ffffff",
          fill: "rgba(198,198,198,.224)",
        }}
      />
      <ellipse
        cx={174.158}
        cy={200.156}
        rx={5.87}
        ry={5.603}
        style={{
          stroke: "#ffffff",
          strokeWidth: 4,
          fill: "rgba(198,198,198,.26)",
        }}
      />
      <path
        d="m200.306 199.888-20.279.112M133.6 195.035l26.149-21.829"
        style={{
          fill: "#d8d8d8",
          stroke: "#ffffff",
          strokeWidth: 4,
        }}
      />
      <path
        d="m132.175 205.716 26.149 21.829"
        style={{
          strokeWidth: 4,
          fill: "transparent",
          stroke: "transparent",
          strokeOpacity: 0,
        }}
      />
    </svg>
  );
}