export default function MarkdownHelp() {
  return (
    <div className="editor-preview">
      <h1>Help section</h1>
      <p>Go back to editing by pressing the questionmark button again.</p>
      <hr></hr>
      <h3>New line: </h3>
      <p>Press space twice than hit enter every time you want a new line. (\s\s\n)</p>
      <hr></hr>
      <table>
        <thead>
          <tr>
            <th>Markup</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>**Strong**</td>
            <td>
              <strong>Strong</strong>
            </td>
          </tr>
          <tr>
            <td>*Emphasis*</td>
            <td>
              <em>Emphasis</em>
            </td>
          </tr>
          <tr>
            <td>~strikethrough~</td>
            <td>
              <del>strikethrough</del>
            </td>
          </tr>
          <tr>
            <td># Heading 1</td>
            <td>
              <h1>Heading 1</h1>
            </td>
          </tr>
          <tr>
            <td>## Heading 2</td>
            <td>
              <h2>Heading 2</h2>
            </td>
          </tr>
          <tr>
            <td>### Heading 3</td>
            <td>
              <h3>Heading 3</h3>
            </td>
          </tr>
          <tr>
            <td>
              ``` js <br></br>
              console.log({`'Hello world!'`}); <br></br>
              ```
            </td>
            <td>
              <div
                style={{
                  backgroundColor: 'rgb(30, 30, 30)',
                  padding: '1rem',
                  borderRadius: '10px'
                }}>
                <code>
                  <span
                    className="token console"
                    style={{ color: 'rgb(255, 255, 182)', 'text-decoration': 'underline' }}>
                    console
                  </span>
                  <span className="token" style={{ color: 'rgb(86, 156, 214)' }}>
                    .
                  </span>
                  <span
                    className="token method property-access"
                    style={{ color: 'rgb(86, 156, 214)' }}>
                    log
                  </span>
                  <span className="token" style={{ color: 'rgb(86, 156, 214)' }}>
                    (
                  </span>
                  <span className="token" style={{ color: 'rgb(206, 145, 120)' }}>
                    {`'Hello world'`}
                  </span>
                  <span className="token" style={{ color: 'rgb(86, 156, 214)' }}>
                    );
                  </span>
                </code>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              {'>'} This is a quote<br></br>
              {'>'} Second line of the quote
            </td>
            <td>
              <blockquote>
                <p>
                  This is a quote<br></br>Second line of the quote
                </p>
              </blockquote>
            </td>
          </tr>
          <tr>
            <td>[example](https://www.example.com)</td>
            <td>
              <p className="link-style">example</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                | header | header | <br></br>| - | - |<br></br>| a | c |{' '}
              </p>
            </td>
            <td>
              <table>
                <thead>
                  <tr>
                    <th>header</th>
                    <th>header</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>a</td>
                    <td>c</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
