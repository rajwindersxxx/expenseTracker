export function Footer() {
  let date = new Date();

  return (
    <footer style={{ margin: '0px 0  24px 0 ' }}>
      <p style={{ textAlign: 'center' }}>
        © {date.getFullYear()} Rajwinder singh. All Rights Reserved.
      </p>
    </footer>
  );
}
