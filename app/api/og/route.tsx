// File: app/api/og/route.tsx
import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url)
    const title = searchParams.get('title')
    const tagsParam = searchParams.get('tags')

    if (!title) {
      throw new Error('Title parameter is required')
    }

    let tags: string[] = []
    try {
      tags = tagsParam ? JSON.parse(tagsParam) : []
    } catch (e) {
      tags = tagsParam ? tagsParam.split(',') : []
    }

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex', // Explicit display: flex
            height: '100%',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            background:
              'linear-gradient(120deg, rgba(255,255,255,1) 56%, rgba(237,188,255,1) 83%, rgba(148,99,181,1) 100%)',
            padding: '60px 60px',
          }}
        >
          <div
            style={{
              display: 'flex', // Explicit display: flex
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div
              style={{
                display: 'flex', // Explicit display: flex
                fontSize: '60px',
                fontWeight: 'bold',
                color: 'black',
                lineHeight: '1.3',
              }}
            >
              {title}
            </div>

            {tags.length > 0 && (
              <div
                style={{
                  display: 'flex', // Explicit display: flex
                  flexDirection: 'row',
                  gap: '10px',
                  flexWrap: 'wrap',
                }}
              >
                {tags.map((tag: string) => (
                  <div
                    key={tag}
                    style={{
                      display: 'flex', // Explicit display: flex
                      border: '1px solid #555',
                      borderRadius: '12px',
                      padding: '5px 15px',
                      color: '#555',
                      fontSize: '20px',
                    }}
                  >
                    #{tag}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              display: 'flex', // Explicit display: flex
              fontSize: '50px',
              fontWeight: 'bold',
              color: 'black',
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
        },
      }
    )
  } catch (e) {
    console.error('Error generating image:', e instanceof Error ? e.message : 'Unknown error')
    return new Response(
      `Failed to generate the image: ${e instanceof Error ? e.message : 'Unknown error'}`,
      {
        status: 500,
        headers: {
          'content-type': 'text/plain',
        },
      }
    )
  }
}
