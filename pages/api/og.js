import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'edge',
  unstable_allowDynamic: [
    '/node_modules/@vercel/og/**',
  ],
}

export default async function handler(request) {
  console.log('OG API request received')
  
  try {
    const title = new URL(request.url).searchParams.get('title')
    const tags = new URL(request.url).searchParams.get('tags').split(",")

    console.log(tags)
    console.log(tags[0].length)
    console.log('Generating image for title:', title)

    const response = new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            background: 'linear-gradient(120deg, rgba(255,255,255,1) 56%, rgba(237,188,255,1) 83%, rgba(148,99,181,1) 100%)',
            padding: '20px 60px',
          }}
        >

          <div style={{display: "flex", flexDirection: "column"}}>
            <div
              style={{
                fontSize: 60,
                fontWeight: 'bold',
                letterSpacing: '-0.025em',
                color: 'black',
                marginTop: 40,
                lineHeight: 1.3,
                whiteSpace: 'pre-wrap',
                textAlign: 'left', // Left align text
                fontFamily: "'Inter', monospace" // Using a monospace font
              }}
            >
              {title}
            </div>
            {
              tags && tags.length > 0 && tags[0].length > 0 &&  (
                <div style={{ display: "flex", marginTop: "20px" }}>
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      style={{
                        border: "1px solid #555",
                        borderRadius: "12px",
                        fontSize: "20px",
                        padding: "5px 15px",
                        marginRight: "10px",
                        whiteSpace: "nowrap",
                        color: "#555"
                      }}
                    >
                      {`#${tag.split(" ").join("-")}`}
                    </div>
                  ))}
                </div>
              )
            }
          </div>
          <div
            style={{
              fontSize: 50,
              fontWeight: 'bold',
              letterSpacing: '-0.025em',
              color: 'black',
              marginBottom: 40,
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
              textAlign: 'left',
              fontFamily: "'Inter', monospace"
            }}
          >
            Sreeram Venkitesh
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'content-type': 'image/png',
          'cache-control': 'public, max-age=31536000, immutable',
          'content-security-policy': "default-src 'none'; img-src 'self' data:; style-src 'unsafe-inline'",
        },
      },
    )
    
    console.log('Image generated successfully')
    return response

  } catch (e) {
    console.error('Error generating image:', e)
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
      headers: {
        'content-type': 'text/plain',
      },
    })
  }
}
