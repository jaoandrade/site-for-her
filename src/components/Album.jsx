import { useState, useMemo, useEffect } from 'react'
import { supabase } from '../supabase/client'
import './Album.css'

const Album = ({ onBack }) => {
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [customImages, setCustomImages] = useState([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadImage, setUploadImage] = useState(null)
  const [uploadText, setUploadText] = useState('')

  // Decorative NubCats to spread throughout the Album (without excessive repetition)
  const decorativeCats = [
    '/resources/images/nubnubcat/Love/ustogetherhappy.png',
    '/resources/images/nubnubcat/Love/ushugging.png',
    '/resources/images/nubnubcat/Love/shehuggingme.png',
    '/resources/images/nubnubcat/Love/SheIsMyLilBoba.png',
    '/resources/images/nubnubcat/Love/Ilovehereyes.png',
    '/resources/images/nubnubcat/Love/MeTeasingHer.png'
  ]

  // Organize media in the specific requested order
  const organizeAlbumMedia = () => {
    const media = []
    let idCounter = 1

    // 1. Fotos Juntos (8 images)
    const fotosJuntos = [
      { name: 'Fotos Juntos.jpeg', comment: 'Me and my Sweetie 💕' },
      { name: 'Fotos Juntos (2).jpeg', comment: 'Perfect moments captured forever 💖' },
      { name: 'Fotos Juntos (3).jpeg', comment: 'Together is my favorite place 🥰' },
      { name: 'Fotos Juntos (4).jpeg', comment: 'Love in every frame ❤️' },
      { name: 'Fotos Juntos (5).jpeg', comment: 'These memories make my heart full 💗' },
      { name: 'Fotos Juntos (6).jpeg', comment: 'You make every moment special 🌸' },
      { name: 'Fotos Juntos (7).jpeg', comment: 'Forever grateful for these days 💝' },
      { name: 'Fotos Juntos (8).jpeg', comment: 'Pure happiness captured 💫' }
    ]
    fotosJuntos.forEach(img => {
      media.push({
        id: idCounter++,
        url: `/resources/images/album/${img.name}`,
        type: 'image',
        comment: img.comment
      })
    })

    // 2. Me With Her (6 images + 2 videos) + Trogir (1 image + 1 video) - Trogir together
    const meWithHer = [
      { name: 'MeWithHer.jpeg', comment: 'Making memories with you 💕' },
      { name: 'MeWithHer (2).jpeg', comment: 'Every photo is a treasure 🌹' },
      { name: 'MeWithHer (3).jpeg', comment: 'Love looks so good on us 💖' },
      { name: 'MeWithHer (4).jpeg', comment: 'Time stands still with you ⏰' },
      { name: 'MeWithHer (5).jpeg', comment: 'You are like, ahahh 👅' },
      { name: 'MeWithHer (6).jpeg', comment: 'Forever my favorite person 💕' }
    ]
    meWithHer.forEach(img => {
      media.push({
        id: idCounter++,
        url: `/resources/images/album/${img.name}`,
        type: 'image',
        comment: img.comment
      })
    })

    // Me With Her Videos
    media.push({
      id: idCounter++,
      url: '/resources/videos/MeWithHer.mp4',
      type: 'video',
      comment: 'You are so cute! 🥹💕'
    })
    media.push({
      id: idCounter++,
      url: '/resources/videos/MeWithHer2.mp4',
      type: 'video',
      comment: 'Me beating you with Shrek, helpp 😭😭'
    })

    // Trogir (together with Me With Her and Fotos Juntos)
    media.push({
      id: idCounter++,
      url: '/resources/images/album/Trogir.jpeg',
      type: 'image',
      comment: 'Beautiful place, beautiful memories 🌍💕'
    })
    media.push({
      id: idCounter++,
      url: '/resources/videos/Trogir.mp4',
      type: 'video',
      comment: 'Exploring together in Trogir 🎬✨'
    })

    // 3. Everything from Hvar (videos first, then photos)
    // Hvar Videos
    media.push({
      id: idCounter++,
      url: '/resources/videos/Hvar Video.mp4',
      type: 'video',
      comment: 'Amazing moments in Hvar 🏖️💕'
    })
    media.push({
      id: idCounter++,
      url: '/resources/videos/Caminho HVar.mp4',
      type: 'video',
      comment: 'The beautiful path to Hvar 🛤️✨'
    })

    // Hvar Photos
    const hvarFotos = [
      { name: 'Hvar.jpeg', comment: 'Paradise found in Hvar 🌊' },
      { name: 'Hvar (2).jpeg', comment: 'Sunset memories 💖' },
      { name: 'Hvar (3).jpeg', comment: 'Perfect days together ☀️' },
      { name: 'Hvar (4).jpeg', comment: 'Adventures in Hvar 🏝️' },
      { name: 'Hvar (5).jpeg', comment: 'Love and sunshine 💕' }
    ]
    hvarFotos.forEach(img => {
      media.push({
        id: idCounter++,
        url: `/resources/images/album/${img.name}`,
        type: 'image',
        comment: img.comment
      })
    })

    // Caminho Hvar photos
    const caminhoHvar = [
      { name: 'Caminho Hvar.jpeg', comment: 'The journey together 🛤️' },
      { name: 'Caminho Hvar (2).jpeg', comment: 'Beautiful path, beautiful company 💕' },
      { name: 'caminho Hvar (3).jpeg', comment: 'Very Silly 🤭✨' },
      { name: 'Caminho Hvar (4).jpeg', comment: 'Walking hand in hand 💖' },
      { name: 'Caminho Hvar (5).jpeg', comment: 'The road to happiness 🛣️' }
    ]
    caminhoHvar.forEach(img => {
      media.push({
        id: idCounter++,
        url: `/resources/images/album/${img.name}`,
        type: 'image',
        comment: img.comment
      })
    })

    // 4. Cuddling (9 images)
    const cuddling = [
      { name: 'Cuddling.jpeg', comment: 'Snuggles and cuddles 💕' },
      { name: 'Cuddling (2).jpeg', comment: 'Warmth and comfort 🥰' },
      { name: 'Cuddling (3).jpeg', comment: 'Fuck you Julien, Leave us alone 😡' },
      { name: 'Cuddling (4).jpeg', comment: 'Your Sleeping Beauty💤' },
      { name: 'Cuddling (5).jpeg', comment: 'Hugs that heal the heart 💗' },
      { name: 'Cuddling (6).jpeg', comment: 'JULIEN FUCKKK OFFFF!! 😡😡' },
      { name: 'Cuddling (7).jpeg', comment: 'Perfect closeness 💖' },
      { name: 'Cuddling (8).jpeg', comment: 'Pure comfort together 💫' },
      { name: 'Cuddling (9).jpeg', comment: 'Your arms are home 🏠💕' }
    ]
    cuddling.forEach(img => {
      media.push({
        id: idCounter++,
        url: `/resources/images/album/${img.name}`,
        type: 'image',
        comment: img.comment
      })
    })

    // 5. Her (10 images)
    const her = [
      { name: 'Her.jpeg', comment: 'Beautiful you 💕' },
      { name: 'Her (1).jpeg', comment: 'My favorite view 🌹' },
      { name: 'Her (2).jpeg', comment: 'You light up everything ✨' },
      { name: 'Her (3).jpeg', comment: 'Gorgeous inside and out 💖' },
      { name: 'Her (4).jpeg', comment: 'Simply stunning 🌸' },
      { name: 'Her (5).jpeg', comment: 'Your beauty takes my breath away 💗' },
      { name: 'Her (6).jpeg', comment: 'Every angle is perfect 💝' },
      { name: 'Her (7).jpeg', comment: 'My beautiful girl 💫' },
      { name: 'Her (8).jpeg', comment: 'You are art 💕' },
      { name: 'Her (9).jpeg', comment: 'Perfect in every way ❤️' }
    ]
    her.forEach(img => {
      media.push({
        id: idCounter++,
        url: `/resources/images/album/${img.name}`,
        type: 'image',
        comment: img.comment
      })
    })

    // 6. SillyFaces (3 images) - after Her, before Minions
    const sillyFaces = [
      { name: 'SillyFaces (2).jpeg', comment: 'We are the perfect match 😆' },
      { name: 'SillyFaces (3).jpeg', comment: 'Fun and goofy times 🥳' },
      { name: 'SillyFaces (4).jpeg', comment: 'Our Silliest Us 😄' }
    ]
    sillyFaces.forEach(img => {
      media.push({
        id: idCounter++,
        url: `/resources/images/album/${img.name}`,
        type: 'image',
        comment: img.comment
      })
    })

    // 7. Minions (2 images)
    const minions = [
      { name: 'Minions.jpeg', comment: 'Minion adventures 🟡' },
      { name: 'Minions (2).jpeg', comment: 'Tonight We Steal The Moon 💛🌙' }
    ]
    minions.forEach(img => {
      media.push({
        id: idCounter++,
        url: `/resources/images/album/${img.name}`,
        type: 'image',
        comment: img.comment
      })
    })

    // 8. Instagram Drawing (1 image)
    media.push({
      id: idCounter++,
      url: '/resources/images/album/Instagram Desenho.jpeg',
      type: 'image',
      comment: 'Instagram artwork 🎨✨'
    })

    // 9. OnPlane (4 images)
    const onPlane = [
      { name: 'OnPlane.jpeg', comment: 'Flying together ✈️' },
      { name: 'OnPlane (3).jpeg', comment: 'My Sleeping Beauty 💕' },
      { name: 'OnPlane (4).jpeg', comment: 'Sky-high memories ✨' },
      { name: 'OnPlane (5).jpeg', comment: 'Our journey continues 🛫' }
    ]
    onPlane.forEach(img => {
      media.push({
        id: idCounter++,
        url: `/resources/images/album/${img.name}`,
        type: 'image',
        comment: img.comment
      })
    })

    return media
  }

  // Load custom images from Supabase
  useEffect(() => {
    loadCustomImages()
  }, [])

  const loadCustomImages = async () => {
    if (!supabase) return

    try {
      const { data, error } = await supabase
        .from('album_custom_images')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      setCustomImages(data || [])
    } catch (error) {
      console.error('Error loading custom images:', error)
    }
  }

  // Organize media in specific order
  const allMedia = useMemo(() => organizeAlbumMedia(), [])

  // Organize into rows (4 items per row) and add the final cats
  const organizeIntoRows = (media) => {
    const rows = []
    const itemsPerRow = 4
    
    // Add custom images from database
    const customMedia = customImages.map(img => ({
      id: `custom-${img.id}`,
      url: img.image_url,
      type: 'image',
      comment: img.text || '',
      isCustom: true
    }))
    
    // Add the final cat (clickable for upload) - only ONE cat
    const finalCats = [
      {
        id: 'final-cat-1',
        url: '/resources/images/nubnubcat/Love/ustogetherhappy.png',
        type: 'image',
        comment: 'Click to add image 💕',
        isFinalCat: true,
        isUploadButton: true
      }
    ]
    
    // Combine normal media with custom images and final cats
    const allItems = [...media, ...customMedia, ...finalCats]
    
    for (let i = 0; i < allItems.length; i += itemsPerRow) {
      rows.push(allItems.slice(i, i + itemsPerRow))
    }
    return rows
  }

  const mediaRows = useMemo(() => organizeIntoRows(allMedia), [allMedia, customImages])
  
  // Decide where to place decorative cats (deterministic, not random)
  const shouldShowCatInRow = (rowIndex) => {
    // Show decorative cat in specific rows (2, 4, 6, etc)
    return rowIndex > 0 && rowIndex % 2 === 0
  }
  
  const shouldShowCatInGrid = (rowIndex, rowLength, row) => {
    // Show cat in grid if row is not complete (empty space) and doesn't contain the final cat
    const hasFinalCat = row && row.some(item => item.isFinalCat)
    return rowLength < 4 && rowIndex % 3 === 0 && !hasFinalCat
  }

  const openModal = (media) => {
    setSelectedMedia(media)
  }

  const closeModal = () => {
    setSelectedMedia(null)
  }

  const handleFinalCatClick = () => {
    setShowUploadModal(true)
  }

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // Revoke previous object URL if exists
      if (uploadImage) {
        URL.revokeObjectURL(URL.createObjectURL(uploadImage))
      }
      setUploadImage(file)
      console.log('Image selected:', file.name, 'Size:', file.size) // Debug
    } else {
      console.log('No file selected') // Debug
    }
  }

  const handleUpload = async () => {
    if (!uploadImage) {
      alert('Please select an image first 📸')
      return
    }
    
    if (!supabase) {
      alert('Supabase not configured. Please create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. See SUPABASE_SETUP.md for details.')
      return
    }

    setUploading(true)

    try {
      // Upload image to Supabase Storage
      const fileExt = uploadImage.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `album-images/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('album-images')
        .upload(filePath, uploadImage)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('album-images')
        .getPublicUrl(filePath)

      // Save to database
      const { data, error: dbError } = await supabase
        .from('album_custom_images')
        .insert([{ 
          image_url: publicUrl,
          text: uploadText 
        }])
        .select()

      if (dbError) throw dbError

      // Reload custom images
      await loadCustomImages()

      // Reset form
      setUploadImage(null)
      setUploadText('')
      setShowUploadModal(false)
    } catch (error) {
      console.error('Error uploading image:', error)
      let errorMessage = 'Failed to upload image. Please try again.'
      
      // More specific error messages
      if (error.message) {
        if (error.message.includes('JWT')) {
          errorMessage = 'Supabase authentication error. Please check your API key in .env file.'
        } else if (error.message.includes('bucket') || error.message.includes('storage')) {
          errorMessage = 'Storage bucket error. Please check if the "album-images" bucket exists in Supabase.'
        } else if (error.message.includes('permission') || error.message.includes('policy')) {
          errorMessage = 'Permission denied. Please check Supabase Storage policies.'
        } else {
          errorMessage = `Error: ${error.message}`
        }
      }
      
      alert(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="album">
      <div className="album-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h1 className="album-title">📸 Our Album 💕</h1>
      </div>

      {allMedia.length === 0 ? (
        <div className="empty-album">
          <p className="empty-text">No photos yet! 📷</p>
          <p className="empty-subtext">Add images to the album folder to see them here! ✨</p>
        </div>
      ) : (
        <div className="album-rows-container">
          {mediaRows.map((row, rowIndex) => (
            <div key={rowIndex} className="album-row">
              {/* Decorative separator between rows */}
              {rowIndex > 0 && (
                <div className="row-separator">
                  <div className="separator-line"></div>
                  <div className="separator-emoji">
                    {rowIndex % 3 === 1 ? '💕' : rowIndex % 3 === 2 ? '✨' : '💖'}
                  </div>
                  <div className="separator-line"></div>
                </div>
              )}
              
              {/* Decorative NubCat strategically between rows */}
              {shouldShowCatInRow(rowIndex) && (
                <div className="row-decorative-cat">
                  <img 
                    src={decorativeCats[rowIndex % decorativeCats.length]} 
                    alt="Decorative cat"
                    className="decorative-cat-image"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>
              )}

              <div className="album-grid-row">
                {row.map((media) => (
                  <div
                    key={media.id}
                    className={`album-item ${media.type === 'video' ? 'video-item' : ''} ${media.isFinalCat ? 'end-decorative-cat-item' : ''}`}
                    onClick={() => {
                      if (media.isFinalCat) {
                        handleFinalCatClick()
                      } else {
                        openModal(media)
                      }
                    }}
                  >
                    {media.type === 'video' ? (
                      <video 
                        src={media.url} 
                        className="album-video-thumbnail"
                        muted
                        playsInline
                      />
                    ) : (
                      <img 
                        src={media.url} 
                        alt={media.isFinalCat ? "Love cat" : "Memory"} 
                        loading="lazy"
                        className={media.isFinalCat ? "end-decorative-cat-image" : ""}
                        onError={(e) => {
                          if (!media.isFinalCat) {
                            e.target.src = 'https://via.placeholder.com/400x400/ffb3d9/ffffff?text=Memory'
                          } else {
                            e.target.style.display = 'none'
                          }
                        }}
                      />
                    )}
                    {media.type === 'video' && (
                      <div className="video-play-icon">▶️</div>
                    )}
                    {media.comment && (
                      <div className="item-comment">
                        <span className="comment-emoji">💬</span>
                        <span className="comment-text">{media.comment}</span>
                      </div>
                    )}
                    {!media.isFinalCat && (
                      <div className="item-overlay">
                        <span className="overlay-emoji">👆</span>
                      </div>
                    )}
                    {media.isFinalCat && (
                      <div className="item-overlay">
                        <span className="overlay-emoji">💕</span>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Decorative NubCat at the end of the row when there's space (empty spaces) */}
                {shouldShowCatInGrid(rowIndex, row.length, row) && (
                  <div className="album-item decorative-cat-item">
                    <img 
                      src={decorativeCats[(rowIndex * 2) % decorativeCats.length]} 
                      alt="Cute cat"
                      className="decorative-cat-in-grid"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Final separation line to add more space */}
          <div className="row-separator final-separator">
            <div className="separator-line"></div>
            <div className="separator-emoji">💕</div>
            <div className="separator-line"></div>
          </div>
        </div>
      )}

      {/* Fullscreen Modal */}
      {selectedMedia && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>
            {selectedMedia.type === 'video' ? (
              <video 
                src={selectedMedia.url} 
                controls
                autoPlay
                className="modal-video"
              />
            ) : (
              <img 
                src={selectedMedia.url} 
                alt="Memory"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600/ffb3d9/ffffff?text=Memory'
                }}
              />
            )}
            {selectedMedia.comment && (
              <div className="modal-comment">
                <p>{selectedMedia.comment}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal" onClick={() => !uploading && setShowUploadModal(false)}>
          <div className="modal-content upload-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setShowUploadModal(false)}
              disabled={uploading}
            >
              ✕
            </button>
            <h2 className="upload-modal-title">Add Image to Album 💕</h2>
            
            <div className="upload-form">
              <div className="upload-label">
                <span>Select Image 📸</span>
                <label className="upload-file-label">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    disabled={uploading}
                    className="upload-input"
                    id="image-upload-input"
                  />
                  <span className="upload-file-button">
                    {uploadImage ? `✓ ${uploadImage.name}` : '📷 Tap to select image from gallery'}
                  </span>
                </label>
                {uploadImage && (
                  <div 
                    className="upload-preview"
                    onClick={() => {
                      // Click on preview to select another image
                      const input = document.getElementById('image-upload-input')
                      if (input && !uploading) {
                        input.click()
                      }
                    }}
                    style={{ cursor: uploading ? 'default' : 'pointer' }}
                    title={uploading ? '' : 'Click to select another image'}
                  >
                    <img 
                      src={URL.createObjectURL(uploadImage)} 
                      alt="Preview - Click to change" 
                      className="upload-preview-image"
                    />
                    {!uploading && (
                      <div className="upload-preview-overlay">
                        <span className="upload-preview-hint">Tap to select another image</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <label className="upload-label">
                <span>Text/Comment (Optional) 💬</span>
                <textarea
                  className="upload-textarea"
                  value={uploadText}
                  onChange={(e) => setUploadText(e.target.value)}
                  placeholder="Add a comment or description..."
                  rows="3"
                  disabled={uploading}
                />
              </label>

              <div className="upload-actions">
                <button
                  className="upload-submit-button"
                  onClick={handleUpload}
                  disabled={!uploadImage || uploading}
                >
                  {uploading ? 'Uploading... ⏳' : 'Upload Image ✨'}
                </button>
                <button
                  className="upload-cancel-button"
                  onClick={() => {
                    setShowUploadModal(false)
                    setUploadImage(null)
                    setUploadText('')
                  }}
                  disabled={uploading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Album
