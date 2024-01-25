import { useRef, useEffect } from "react";

type dataValue = { name: string; coordinate_x: number; coordinate_y: number };

function CartesianPlane({ data }: { data: dataValue[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    // X-axis
    context.beginPath();
    context.moveTo(0, canvas.height / 2);
    context.lineTo(canvas.width, canvas.height / 2);
    context.strokeStyle = "#666";
    context.stroke();

    // Y-axis
    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.strokeStyle = "#666";
    context.stroke();

    // Draw lines
    context.beginPath();
    context.moveTo(canvas.width / 2, canvas.height / 2);

    data.forEach((point: dataValue) => {
      context.fillStyle = "white";
      context.fillText(
        point.name,
        canvas.width / 2 + point.coordinate_x,
        canvas.height / 2 - point.coordinate_y
      );

      context.lineTo(
        canvas.width / 2 + point.coordinate_x,
        canvas.height / 2 - point.coordinate_y
      );
    });

    // End of the line
    context.lineTo(canvas.width / 2, canvas.height / 2);

    context.strokeStyle = "white";
    context.stroke();
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      style={{ border: "1px solid #666" }}
    />
  );
}

export default CartesianPlane;
