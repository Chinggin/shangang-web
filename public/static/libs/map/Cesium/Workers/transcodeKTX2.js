define([
  './when-229515d6',
  './RuntimeError-ffe03243',
  './WebGLConstants-4e26b85a',
  './createTaskProcessorWorker',
], function (_, R, A, t) {
  'use strict';
  var e = {
      UNSIGNED_BYTE: A.WebGLConstants.UNSIGNED_BYTE,
      UNSIGNED_SHORT: A.WebGLConstants.UNSIGNED_SHORT,
      UNSIGNED_INT: A.WebGLConstants.UNSIGNED_INT,
      FLOAT: A.WebGLConstants.FLOAT,
      HALF_FLOAT: A.WebGLConstants.HALF_FLOAT_OES,
      UNSIGNED_INT_24_8: A.WebGLConstants.UNSIGNED_INT_24_8,
      UNSIGNED_SHORT_4_4_4_4: A.WebGLConstants.UNSIGNED_SHORT_4_4_4_4,
      UNSIGNED_SHORT_5_5_5_1: A.WebGLConstants.UNSIGNED_SHORT_5_5_5_1,
      UNSIGNED_SHORT_5_6_5: A.WebGLConstants.UNSIGNED_SHORT_5_6_5,
      toWebGLConstant: function (_, R) {
        switch (_) {
          case e.UNSIGNED_BYTE:
            return A.WebGLConstants.UNSIGNED_BYTE;
          case e.UNSIGNED_SHORT:
            return A.WebGLConstants.UNSIGNED_SHORT;
          case e.UNSIGNED_INT:
            return A.WebGLConstants.UNSIGNED_INT;
          case e.FLOAT:
            return A.WebGLConstants.FLOAT;
          case e.HALF_FLOAT:
            return R.webgl2 ? A.WebGLConstants.HALF_FLOAT : A.WebGLConstants.HALF_FLOAT_OES;
          case e.UNSIGNED_INT_24_8:
            return A.WebGLConstants.UNSIGNED_INT_24_8;
          case e.UNSIGNED_SHORT_4_4_4_4:
            return A.WebGLConstants.UNSIGNED_SHORT_4_4_4_4;
          case e.UNSIGNED_SHORT_5_5_5_1:
            return A.WebGLConstants.UNSIGNED_SHORT_5_5_5_1;
          case e.UNSIGNED_SHORT_5_6_5:
            return e.UNSIGNED_SHORT_5_6_5;
        }
      },
      isPacked: function (_) {
        return (
          _ === e.UNSIGNED_INT_24_8 ||
          _ === e.UNSIGNED_SHORT_4_4_4_4 ||
          _ === e.UNSIGNED_SHORT_5_5_5_1 ||
          _ === e.UNSIGNED_SHORT_5_6_5
        );
      },
      sizeInBytes: function (_) {
        switch (_) {
          case e.UNSIGNED_BYTE:
            return 1;
          case e.UNSIGNED_SHORT:
          case e.UNSIGNED_SHORT_4_4_4_4:
          case e.UNSIGNED_SHORT_5_5_5_1:
          case e.UNSIGNED_SHORT_5_6_5:
          case e.HALF_FLOAT:
            return 2;
          case e.UNSIGNED_INT:
          case e.FLOAT:
          case e.UNSIGNED_INT_24_8:
            return 4;
        }
      },
      validate: function (_) {
        return (
          _ === e.UNSIGNED_BYTE ||
          _ === e.UNSIGNED_SHORT ||
          _ === e.UNSIGNED_INT ||
          _ === e.FLOAT ||
          _ === e.HALF_FLOAT ||
          _ === e.UNSIGNED_INT_24_8 ||
          _ === e.UNSIGNED_SHORT_4_4_4_4 ||
          _ === e.UNSIGNED_SHORT_5_5_5_1 ||
          _ === e.UNSIGNED_SHORT_5_6_5
        );
      },
    },
    T = Object.freeze(e),
    O = {
      DEPTH_COMPONENT: A.WebGLConstants.DEPTH_COMPONENT,
      DEPTH_STENCIL: A.WebGLConstants.DEPTH_STENCIL,
      ALPHA: A.WebGLConstants.ALPHA,
      RGB: A.WebGLConstants.RGB,
      RGBA: A.WebGLConstants.RGBA,
      LUMINANCE: A.WebGLConstants.LUMINANCE,
      LUMINANCE_ALPHA: A.WebGLConstants.LUMINANCE_ALPHA,
      RGB_DXT1: A.WebGLConstants.COMPRESSED_RGB_S3TC_DXT1_EXT,
      RGBA_DXT1: A.WebGLConstants.COMPRESSED_RGBA_S3TC_DXT1_EXT,
      RGBA_DXT3: A.WebGLConstants.COMPRESSED_RGBA_S3TC_DXT3_EXT,
      RGBA_DXT5: A.WebGLConstants.COMPRESSED_RGBA_S3TC_DXT5_EXT,
      RGB_PVRTC_4BPPV1: A.WebGLConstants.COMPRESSED_RGB_PVRTC_4BPPV1_IMG,
      RGB_PVRTC_2BPPV1: A.WebGLConstants.COMPRESSED_RGB_PVRTC_2BPPV1_IMG,
      RGBA_PVRTC_4BPPV1: A.WebGLConstants.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,
      RGBA_PVRTC_2BPPV1: A.WebGLConstants.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG,
      RGBA_ASTC: A.WebGLConstants.COMPRESSED_RGBA_ASTC_4x4_WEBGL,
      RGB_ETC1: A.WebGLConstants.COMPRESSED_RGB_ETC1_WEBGL,
      RGB8_ETC2: A.WebGLConstants.COMPRESSED_RGB8_ETC2,
      RGBA8_ETC2_EAC: A.WebGLConstants.COMPRESSED_RGBA8_ETC2_EAC,
      RGBA_BC7: A.WebGLConstants.COMPRESSED_RGBA_BPTC_UNORM,
      componentsLength: function (_) {
        switch (_) {
          case O.RGB:
            return 3;
          case O.RGBA:
            return 4;
          case O.LUMINANCE_ALPHA:
            return 2;
          case O.ALPHA:
          case O.LUMINANCE:
          default:
            return 1;
        }
      },
      validate: function (_) {
        return (
          _ === O.DEPTH_COMPONENT ||
          _ === O.DEPTH_STENCIL ||
          _ === O.ALPHA ||
          _ === O.RGB ||
          _ === O.RGBA ||
          _ === O.LUMINANCE ||
          _ === O.LUMINANCE_ALPHA ||
          _ === O.RGB_DXT1 ||
          _ === O.RGBA_DXT1 ||
          _ === O.RGBA_DXT3 ||
          _ === O.RGBA_DXT5 ||
          _ === O.RGB_PVRTC_4BPPV1 ||
          _ === O.RGB_PVRTC_2BPPV1 ||
          _ === O.RGBA_PVRTC_4BPPV1 ||
          _ === O.RGBA_PVRTC_2BPPV1 ||
          _ === O.RGBA_ASTC ||
          _ === O.RGB_ETC1 ||
          _ === O.RGB8_ETC2 ||
          _ === O.RGBA8_ETC2_EAC ||
          _ === O.RGBA_BC7
        );
      },
      isColorFormat: function (_) {
        return (
          _ === O.ALPHA ||
          _ === O.RGB ||
          _ === O.RGBA ||
          _ === O.LUMINANCE ||
          _ === O.LUMINANCE_ALPHA
        );
      },
      isDepthFormat: function (_) {
        return _ === O.DEPTH_COMPONENT || _ === O.DEPTH_STENCIL;
      },
      isCompressedFormat: function (_) {
        return (
          _ === O.RGB_DXT1 ||
          _ === O.RGBA_DXT1 ||
          _ === O.RGBA_DXT3 ||
          _ === O.RGBA_DXT5 ||
          _ === O.RGB_PVRTC_4BPPV1 ||
          _ === O.RGB_PVRTC_2BPPV1 ||
          _ === O.RGBA_PVRTC_4BPPV1 ||
          _ === O.RGBA_PVRTC_2BPPV1 ||
          _ === O.RGBA_ASTC ||
          _ === O.RGB_ETC1 ||
          _ === O.RGB8_ETC2 ||
          _ === O.RGBA8_ETC2_EAC ||
          _ === O.RGBA_BC7
        );
      },
      isDXTFormat: function (_) {
        return _ === O.RGB_DXT1 || _ === O.RGBA_DXT1 || _ === O.RGBA_DXT3 || _ === O.RGBA_DXT5;
      },
      isPVRTCFormat: function (_) {
        return (
          _ === O.RGB_PVRTC_4BPPV1 ||
          _ === O.RGB_PVRTC_2BPPV1 ||
          _ === O.RGBA_PVRTC_4BPPV1 ||
          _ === O.RGBA_PVRTC_2BPPV1
        );
      },
      isASTCFormat: function (_) {
        return _ === O.RGBA_ASTC;
      },
      isETC1Format: function (_) {
        return _ === O.RGB_ETC1;
      },
      isETC2Format: function (_) {
        return _ === O.RGB8_ETC2 || _ === O.RGBA8_ETC2_EAC;
      },
      isBC7Format: function (_) {
        return _ === O.RGBA_BC7;
      },
      compressedTextureSizeInBytes: function (_, R, A) {
        switch (_) {
          case O.RGB_DXT1:
          case O.RGBA_DXT1:
          case O.RGB_ETC1:
          case O.RGB8_ETC2:
            return Math.floor((R + 3) / 4) * Math.floor((A + 3) / 4) * 8;
          case O.RGBA_DXT3:
          case O.RGBA_DXT5:
          case O.RGBA_ASTC:
          case O.RGBA8_ETC2_EAC:
            return Math.floor((R + 3) / 4) * Math.floor((A + 3) / 4) * 16;
          case O.RGB_PVRTC_4BPPV1:
          case O.RGBA_PVRTC_4BPPV1:
            return Math.floor((Math.max(R, 8) * Math.max(A, 8) * 4 + 7) / 8);
          case O.RGB_PVRTC_2BPPV1:
          case O.RGBA_PVRTC_2BPPV1:
            return Math.floor((Math.max(R, 16) * Math.max(A, 8) * 2 + 7) / 8);
          case O.RGBA_BC7:
            return Math.ceil(R / 4) * Math.ceil(A / 4) * 16;
          default:
            return 0;
        }
      },
      textureSizeInBytes: function (_, R, A, t) {
        var e = O.componentsLength(_);
        return T.isPacked(R) && (e = 1), e * T.sizeInBytes(R) * A * t;
      },
      alignmentInBytes: function (_, R, A) {
        var t = O.textureSizeInBytes(_, R, A, 1) % 4;
        return 0 === t ? 4 : 2 === t ? 2 : 1;
      },
      createTypedArray: function (_, R, A, t) {
        var e = T.sizeInBytes(R);
        return new (
          e === Uint8Array.BYTES_PER_ELEMENT
            ? Uint8Array
            : e === Uint16Array.BYTES_PER_ELEMENT
            ? Uint16Array
            : e === Float32Array.BYTES_PER_ELEMENT && R === T.FLOAT
            ? Float32Array
            : Uint32Array
        )(O.componentsLength(_) * A * t);
      },
      flipY: function (_, R, A, t, e) {
        if (1 === e) return _;
        for (
          var T = O.createTypedArray(R, A, t, e), n = O.componentsLength(R), B = t * n, G = 0;
          G < e;
          ++G
        )
          for (var M = G * t * n, C = (e - G - 1) * t * n, K = 0; K < B; ++K) T[C + K] = _[M + K];
        return T;
      },
      toInternalFormat: function (_, R, t) {
        if (!t.webgl2) return _;
        if (_ === O.DEPTH_STENCIL) return A.WebGLConstants.DEPTH24_STENCIL8;
        if (_ === O.DEPTH_COMPONENT) {
          if (R === T.UNSIGNED_SHORT) return A.WebGLConstants.DEPTH_COMPONENT16;
          if (R === T.UNSIGNED_INT) return A.WebGLConstants.DEPTH_COMPONENT24;
        }
        if (R === T.FLOAT)
          switch (_) {
            case O.RGBA:
              return A.WebGLConstants.RGBA32F;
            case O.RGB:
              return A.WebGLConstants.RGB32F;
            case O.RG:
              return A.WebGLConstants.RG32F;
            case O.R:
              return A.WebGLConstants.R32F;
          }
        if (R === T.HALF_FLOAT)
          switch (_) {
            case O.RGBA:
              return A.WebGLConstants.RGBA16F;
            case O.RGB:
              return A.WebGLConstants.RGB16F;
            case O.RG:
              return A.WebGLConstants.RG16F;
            case O.R:
              return A.WebGLConstants.R16F;
          }
        return _;
      },
    },
    n = Object.freeze(O),
    B = Object.freeze({
      VK_FORMAT_UNDEFINED: 0,
      VK_FORMAT_R4G4_UNORM_PACK8: 1,
      VK_FORMAT_R4G4B4A4_UNORM_PACK16: 2,
      VK_FORMAT_B4G4R4A4_UNORM_PACK16: 3,
      VK_FORMAT_R5G6B5_UNORM_PACK16: 4,
      VK_FORMAT_B5G6R5_UNORM_PACK16: 5,
      VK_FORMAT_R5G5B5A1_UNORM_PACK16: 6,
      VK_FORMAT_B5G5R5A1_UNORM_PACK16: 7,
      VK_FORMAT_A1R5G5B5_UNORM_PACK16: 8,
      VK_FORMAT_R8_UNORM: 9,
      VK_FORMAT_R8_SNORM: 10,
      VK_FORMAT_R8_USCALED: 11,
      VK_FORMAT_R8_SSCALED: 12,
      VK_FORMAT_R8_UINT: 13,
      VK_FORMAT_R8_SINT: 14,
      VK_FORMAT_R8_SRGB: 15,
      VK_FORMAT_R8G8_UNORM: 16,
      VK_FORMAT_R8G8_SNORM: 17,
      VK_FORMAT_R8G8_USCALED: 18,
      VK_FORMAT_R8G8_SSCALED: 19,
      VK_FORMAT_R8G8_UINT: 20,
      VK_FORMAT_R8G8_SINT: 21,
      VK_FORMAT_R8G8_SRGB: 22,
      VK_FORMAT_R8G8B8_UNORM: 23,
      VK_FORMAT_R8G8B8_SNORM: 24,
      VK_FORMAT_R8G8B8_USCALED: 25,
      VK_FORMAT_R8G8B8_SSCALED: 26,
      VK_FORMAT_R8G8B8_UINT: 27,
      VK_FORMAT_R8G8B8_SINT: 28,
      VK_FORMAT_R8G8B8_SRGB: 29,
      VK_FORMAT_B8G8R8_UNORM: 30,
      VK_FORMAT_B8G8R8_SNORM: 31,
      VK_FORMAT_B8G8R8_USCALED: 32,
      VK_FORMAT_B8G8R8_SSCALED: 33,
      VK_FORMAT_B8G8R8_UINT: 34,
      VK_FORMAT_B8G8R8_SINT: 35,
      VK_FORMAT_B8G8R8_SRGB: 36,
      VK_FORMAT_R8G8B8A8_UNORM: 37,
      VK_FORMAT_R8G8B8A8_SNORM: 38,
      VK_FORMAT_R8G8B8A8_USCALED: 39,
      VK_FORMAT_R8G8B8A8_SSCALED: 40,
      VK_FORMAT_R8G8B8A8_UINT: 41,
      VK_FORMAT_R8G8B8A8_SINT: 42,
      VK_FORMAT_R8G8B8A8_SRGB: 43,
      VK_FORMAT_B8G8R8A8_UNORM: 44,
      VK_FORMAT_B8G8R8A8_SNORM: 45,
      VK_FORMAT_B8G8R8A8_USCALED: 46,
      VK_FORMAT_B8G8R8A8_SSCALED: 47,
      VK_FORMAT_B8G8R8A8_UINT: 48,
      VK_FORMAT_B8G8R8A8_SINT: 49,
      VK_FORMAT_B8G8R8A8_SRGB: 50,
      VK_FORMAT_A8B8G8R8_UNORM_PACK32: 51,
      VK_FORMAT_A8B8G8R8_SNORM_PACK32: 52,
      VK_FORMAT_A8B8G8R8_USCALED_PACK32: 53,
      VK_FORMAT_A8B8G8R8_SSCALED_PACK32: 54,
      VK_FORMAT_A8B8G8R8_UINT_PACK32: 55,
      VK_FORMAT_A8B8G8R8_SINT_PACK32: 56,
      VK_FORMAT_A8B8G8R8_SRGB_PACK32: 57,
      VK_FORMAT_A2R10G10B10_UNORM_PACK32: 58,
      VK_FORMAT_A2R10G10B10_SNORM_PACK32: 59,
      VK_FORMAT_A2R10G10B10_USCALED_PACK32: 60,
      VK_FORMAT_A2R10G10B10_SSCALED_PACK32: 61,
      VK_FORMAT_A2R10G10B10_UINT_PACK32: 62,
      VK_FORMAT_A2R10G10B10_SINT_PACK32: 63,
      VK_FORMAT_A2B10G10R10_UNORM_PACK32: 64,
      VK_FORMAT_A2B10G10R10_SNORM_PACK32: 65,
      VK_FORMAT_A2B10G10R10_USCALED_PACK32: 66,
      VK_FORMAT_A2B10G10R10_SSCALED_PACK32: 67,
      VK_FORMAT_A2B10G10R10_UINT_PACK32: 68,
      VK_FORMAT_A2B10G10R10_SINT_PACK32: 69,
      VK_FORMAT_R16_UNORM: 70,
      VK_FORMAT_R16_SNORM: 71,
      VK_FORMAT_R16_USCALED: 72,
      VK_FORMAT_R16_SSCALED: 73,
      VK_FORMAT_R16_UINT: 74,
      VK_FORMAT_R16_SINT: 75,
      VK_FORMAT_R16_SFLOAT: 76,
      VK_FORMAT_R16G16_UNORM: 77,
      VK_FORMAT_R16G16_SNORM: 78,
      VK_FORMAT_R16G16_USCALED: 79,
      VK_FORMAT_R16G16_SSCALED: 80,
      VK_FORMAT_R16G16_UINT: 81,
      VK_FORMAT_R16G16_SINT: 82,
      VK_FORMAT_R16G16_SFLOAT: 83,
      VK_FORMAT_R16G16B16_UNORM: 84,
      VK_FORMAT_R16G16B16_SNORM: 85,
      VK_FORMAT_R16G16B16_USCALED: 86,
      VK_FORMAT_R16G16B16_SSCALED: 87,
      VK_FORMAT_R16G16B16_UINT: 88,
      VK_FORMAT_R16G16B16_SINT: 89,
      VK_FORMAT_R16G16B16_SFLOAT: 90,
      VK_FORMAT_R16G16B16A16_UNORM: 91,
      VK_FORMAT_R16G16B16A16_SNORM: 92,
      VK_FORMAT_R16G16B16A16_USCALED: 93,
      VK_FORMAT_R16G16B16A16_SSCALED: 94,
      VK_FORMAT_R16G16B16A16_UINT: 95,
      VK_FORMAT_R16G16B16A16_SINT: 96,
      VK_FORMAT_R16G16B16A16_SFLOAT: 97,
      VK_FORMAT_R32_UINT: 98,
      VK_FORMAT_R32_SINT: 99,
      VK_FORMAT_R32_SFLOAT: 100,
      VK_FORMAT_R32G32_UINT: 101,
      VK_FORMAT_R32G32_SINT: 102,
      VK_FORMAT_R32G32_SFLOAT: 103,
      VK_FORMAT_R32G32B32_UINT: 104,
      VK_FORMAT_R32G32B32_SINT: 105,
      VK_FORMAT_R32G32B32_SFLOAT: 106,
      VK_FORMAT_R32G32B32A32_UINT: 107,
      VK_FORMAT_R32G32B32A32_SINT: 108,
      VK_FORMAT_R32G32B32A32_SFLOAT: 109,
      VK_FORMAT_R64_UINT: 110,
      VK_FORMAT_R64_SINT: 111,
      VK_FORMAT_R64_SFLOAT: 112,
      VK_FORMAT_R64G64_UINT: 113,
      VK_FORMAT_R64G64_SINT: 114,
      VK_FORMAT_R64G64_SFLOAT: 115,
      VK_FORMAT_R64G64B64_UINT: 116,
      VK_FORMAT_R64G64B64_SINT: 117,
      VK_FORMAT_R64G64B64_SFLOAT: 118,
      VK_FORMAT_R64G64B64A64_UINT: 119,
      VK_FORMAT_R64G64B64A64_SINT: 120,
      VK_FORMAT_R64G64B64A64_SFLOAT: 121,
      VK_FORMAT_B10G11R11_UFLOAT_PACK32: 122,
      VK_FORMAT_E5B9G9R9_UFLOAT_PACK32: 123,
      VK_FORMAT_D16_UNORM: 124,
      VK_FORMAT_X8_D24_UNORM_PACK32: 125,
      VK_FORMAT_D32_SFLOAT: 126,
      VK_FORMAT_S8_UINT: 127,
      VK_FORMAT_D16_UNORM_S8_UINT: 128,
      VK_FORMAT_D24_UNORM_S8_UINT: 129,
      VK_FORMAT_D32_SFLOAT_S8_UINT: 130,
      VK_FORMAT_BC1_RGB_UNORM_BLOCK: 131,
      VK_FORMAT_BC1_RGB_SRGB_BLOCK: 132,
      VK_FORMAT_BC1_RGBA_UNORM_BLOCK: 133,
      VK_FORMAT_BC1_RGBA_SRGB_BLOCK: 134,
      VK_FORMAT_BC2_UNORM_BLOCK: 135,
      VK_FORMAT_BC2_SRGB_BLOCK: 136,
      VK_FORMAT_BC3_UNORM_BLOCK: 137,
      VK_FORMAT_BC3_SRGB_BLOCK: 138,
      VK_FORMAT_BC4_UNORM_BLOCK: 139,
      VK_FORMAT_BC4_SNORM_BLOCK: 140,
      VK_FORMAT_BC5_UNORM_BLOCK: 141,
      VK_FORMAT_BC5_SNORM_BLOCK: 142,
      VK_FORMAT_BC6H_UFLOAT_BLOCK: 143,
      VK_FORMAT_BC6H_SFLOAT_BLOCK: 144,
      VK_FORMAT_BC7_UNORM_BLOCK: 145,
      VK_FORMAT_BC7_SRGB_BLOCK: 146,
      VK_FORMAT_ETC2_R8G8B8_UNORM_BLOCK: 147,
      VK_FORMAT_ETC2_R8G8B8_SRGB_BLOCK: 148,
      VK_FORMAT_ETC2_R8G8B8A1_UNORM_BLOCK: 149,
      VK_FORMAT_ETC2_R8G8B8A1_SRGB_BLOCK: 150,
      VK_FORMAT_ETC2_R8G8B8A8_UNORM_BLOCK: 151,
      VK_FORMAT_ETC2_R8G8B8A8_SRGB_BLOCK: 152,
      VK_FORMAT_EAC_R11_UNORM_BLOCK: 153,
      VK_FORMAT_EAC_R11_SNORM_BLOCK: 154,
      VK_FORMAT_EAC_R11G11_UNORM_BLOCK: 155,
      VK_FORMAT_EAC_R11G11_SNORM_BLOCK: 156,
      VK_FORMAT_ASTC_4x4_UNORM_BLOCK: 157,
      VK_FORMAT_ASTC_4x4_SRGB_BLOCK: 158,
      VK_FORMAT_ASTC_5x4_UNORM_BLOCK: 159,
      VK_FORMAT_ASTC_5x4_SRGB_BLOCK: 160,
      VK_FORMAT_ASTC_5x5_UNORM_BLOCK: 161,
      VK_FORMAT_ASTC_5x5_SRGB_BLOCK: 162,
      VK_FORMAT_ASTC_6x5_UNORM_BLOCK: 163,
      VK_FORMAT_ASTC_6x5_SRGB_BLOCK: 164,
      VK_FORMAT_ASTC_6x6_UNORM_BLOCK: 165,
      VK_FORMAT_ASTC_6x6_SRGB_BLOCK: 166,
      VK_FORMAT_ASTC_8x5_UNORM_BLOCK: 167,
      VK_FORMAT_ASTC_8x5_SRGB_BLOCK: 168,
      VK_FORMAT_ASTC_8x6_UNORM_BLOCK: 169,
      VK_FORMAT_ASTC_8x6_SRGB_BLOCK: 170,
      VK_FORMAT_ASTC_8x8_UNORM_BLOCK: 171,
      VK_FORMAT_ASTC_8x8_SRGB_BLOCK: 172,
      VK_FORMAT_ASTC_10x5_UNORM_BLOCK: 173,
      VK_FORMAT_ASTC_10x5_SRGB_BLOCK: 174,
      VK_FORMAT_ASTC_10x6_UNORM_BLOCK: 175,
      VK_FORMAT_ASTC_10x6_SRGB_BLOCK: 176,
      VK_FORMAT_ASTC_10x8_UNORM_BLOCK: 177,
      VK_FORMAT_ASTC_10x8_SRGB_BLOCK: 178,
      VK_FORMAT_ASTC_10x10_UNORM_BLOCK: 179,
      VK_FORMAT_ASTC_10x10_SRGB_BLOCK: 180,
      VK_FORMAT_ASTC_12x10_UNORM_BLOCK: 181,
      VK_FORMAT_ASTC_12x10_SRGB_BLOCK: 182,
      VK_FORMAT_ASTC_12x12_UNORM_BLOCK: 183,
      VK_FORMAT_ASTC_12x12_SRGB_BLOCK: 184,
      VK_FORMAT_G8B8G8R8_422_UNORM: 1000156e3,
      VK_FORMAT_B8G8R8G8_422_UNORM: 1000156001,
      VK_FORMAT_G8_B8_R8_3PLANE_420_UNORM: 1000156002,
      VK_FORMAT_G8_B8R8_2PLANE_420_UNORM: 1000156003,
      VK_FORMAT_G8_B8_R8_3PLANE_422_UNORM: 1000156004,
      VK_FORMAT_G8_B8R8_2PLANE_422_UNORM: 1000156005,
      VK_FORMAT_G8_B8_R8_3PLANE_444_UNORM: 1000156006,
      VK_FORMAT_R10X6_UNORM_PACK16: 1000156007,
      VK_FORMAT_R10X6G10X6_UNORM_2PACK16: 1000156008,
      VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16: 1000156009,
      VK_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16: 1000156010,
      VK_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16: 1000156011,
      VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_420_UNORM_3PACK16: 1000156012,
      VK_FORMAT_G10X6_B10X6R10X6_2PLANE_420_UNORM_3PACK16: 1000156013,
      VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_422_UNORM_3PACK16: 1000156014,
      VK_FORMAT_G10X6_B10X6R10X6_2PLANE_422_UNORM_3PACK16: 1000156015,
      VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_444_UNORM_3PACK16: 1000156016,
      VK_FORMAT_R12X4_UNORM_PACK16: 1000156017,
      VK_FORMAT_R12X4G12X4_UNORM_2PACK16: 1000156018,
      VK_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16: 1000156019,
      VK_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16: 1000156020,
      VK_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16: 1000156021,
      VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_420_UNORM_3PACK16: 1000156022,
      VK_FORMAT_G12X4_B12X4R12X4_2PLANE_420_UNORM_3PACK16: 1000156023,
      VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_422_UNORM_3PACK16: 1000156024,
      VK_FORMAT_G12X4_B12X4R12X4_2PLANE_422_UNORM_3PACK16: 1000156025,
      VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_444_UNORM_3PACK16: 1000156026,
      VK_FORMAT_G16B16G16R16_422_UNORM: 1000156027,
      VK_FORMAT_B16G16R16G16_422_UNORM: 1000156028,
      VK_FORMAT_G16_B16_R16_3PLANE_420_UNORM: 1000156029,
      VK_FORMAT_G16_B16R16_2PLANE_420_UNORM: 1000156030,
      VK_FORMAT_G16_B16_R16_3PLANE_422_UNORM: 1000156031,
      VK_FORMAT_G16_B16R16_2PLANE_422_UNORM: 1000156032,
      VK_FORMAT_G16_B16_R16_3PLANE_444_UNORM: 1000156033,
      VK_FORMAT_PVRTC1_2BPP_UNORM_BLOCK_IMG: 1000054e3,
      VK_FORMAT_PVRTC1_4BPP_UNORM_BLOCK_IMG: 1000054001,
      VK_FORMAT_PVRTC2_2BPP_UNORM_BLOCK_IMG: 1000054002,
      VK_FORMAT_PVRTC2_4BPP_UNORM_BLOCK_IMG: 1000054003,
      VK_FORMAT_PVRTC1_2BPP_SRGB_BLOCK_IMG: 1000054004,
      VK_FORMAT_PVRTC1_4BPP_SRGB_BLOCK_IMG: 1000054005,
      VK_FORMAT_PVRTC2_2BPP_SRGB_BLOCK_IMG: 1000054006,
      VK_FORMAT_PVRTC2_4BPP_SRGB_BLOCK_IMG: 1000054007,
      VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK_EXT: 1000066e3,
      VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK_EXT: 1000066001,
      VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK_EXT: 1000066002,
      VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK_EXT: 1000066003,
      VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK_EXT: 1000066004,
      VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK_EXT: 1000066005,
      VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK_EXT: 1000066006,
      VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK_EXT: 1000066007,
      VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK_EXT: 1000066008,
      VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK_EXT: 1000066009,
      VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK_EXT: 1000066010,
      VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK_EXT: 1000066011,
      VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK_EXT: 1000066012,
      VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK_EXT: 1000066013,
      VK_FORMAT_G8B8G8R8_422_UNORM_KHR: 1000156e3,
      VK_FORMAT_B8G8R8G8_422_UNORM_KHR: 1000156001,
      VK_FORMAT_G8_B8_R8_3PLANE_420_UNORM_KHR: 1000156002,
      VK_FORMAT_G8_B8R8_2PLANE_420_UNORM_KHR: 1000156003,
      VK_FORMAT_G8_B8_R8_3PLANE_422_UNORM_KHR: 1000156004,
      VK_FORMAT_G8_B8R8_2PLANE_422_UNORM_KHR: 1000156005,
      VK_FORMAT_G8_B8_R8_3PLANE_444_UNORM_KHR: 1000156006,
      VK_FORMAT_R10X6_UNORM_PACK16_KHR: 1000156007,
      VK_FORMAT_R10X6G10X6_UNORM_2PACK16_KHR: 1000156008,
      VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16_KHR: 1000156009,
      VK_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16_KHR: 1000156010,
      VK_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16_KHR: 1000156011,
      VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_420_UNORM_3PACK16_KHR: 1000156012,
      VK_FORMAT_G10X6_B10X6R10X6_2PLANE_420_UNORM_3PACK16_KHR: 1000156013,
      VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_422_UNORM_3PACK16_KHR: 1000156014,
      VK_FORMAT_G10X6_B10X6R10X6_2PLANE_422_UNORM_3PACK16_KHR: 1000156015,
      VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_444_UNORM_3PACK16_KHR: 1000156016,
      VK_FORMAT_R12X4_UNORM_PACK16_KHR: 1000156017,
      VK_FORMAT_R12X4G12X4_UNORM_2PACK16_KHR: 1000156018,
      VK_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16_KHR: 1000156019,
      VK_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16_KHR: 1000156020,
      VK_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16_KHR: 1000156021,
      VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_420_UNORM_3PACK16_KHR: 1000156022,
      VK_FORMAT_G12X4_B12X4R12X4_2PLANE_420_UNORM_3PACK16_KHR: 1000156023,
      VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_422_UNORM_3PACK16_KHR: 1000156024,
      VK_FORMAT_G12X4_B12X4R12X4_2PLANE_422_UNORM_3PACK16_KHR: 1000156025,
      VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_444_UNORM_3PACK16_KHR: 1000156026,
      VK_FORMAT_G16B16G16R16_422_UNORM_KHR: 1000156027,
      VK_FORMAT_B16G16R16G16_422_UNORM_KHR: 1000156028,
      VK_FORMAT_G16_B16_R16_3PLANE_420_UNORM_KHR: 1000156029,
      VK_FORMAT_G16_B16R16_2PLANE_420_UNORM_KHR: 1000156030,
      VK_FORMAT_G16_B16_R16_3PLANE_422_UNORM_KHR: 1000156031,
      VK_FORMAT_G16_B16R16_2PLANE_422_UNORM_KHR: 1000156032,
      VK_FORMAT_G16_B16_R16_3PLANE_444_UNORM_KHR: 1000156033,
    });
  const G = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
  var M, C, K, r, F, N, s, i, S;
  ((S = M || (M = {}))[(S.NONE = 0)] = 'NONE'),
    (S[(S.BASISLZ = 1)] = 'BASISLZ'),
    (S[(S.ZSTD = 2)] = 'ZSTD'),
    (S[(S.ZLIB = 3)] = 'ZLIB'),
    (function (_) {
      _[(_.BASICFORMAT = 0)] = 'BASICFORMAT';
    })(C || (C = {})),
    (function (_) {
      (_[(_.UNSPECIFIED = 0)] = 'UNSPECIFIED'),
        (_[(_.ETC1S = 163)] = 'ETC1S'),
        (_[(_.UASTC = 166)] = 'UASTC');
    })(K || (K = {})),
    (function (_) {
      (_[(_.UNSPECIFIED = 0)] = 'UNSPECIFIED'), (_[(_.SRGB = 1)] = 'SRGB');
    })(r || (r = {})),
    (function (_) {
      (_[(_.UNSPECIFIED = 0)] = 'UNSPECIFIED'),
        (_[(_.LINEAR = 1)] = 'LINEAR'),
        (_[(_.SRGB = 2)] = 'SRGB'),
        (_[(_.ITU = 3)] = 'ITU'),
        (_[(_.NTSC = 4)] = 'NTSC'),
        (_[(_.SLOG = 5)] = 'SLOG'),
        (_[(_.SLOG2 = 6)] = 'SLOG2');
    })(F || (F = {})),
    (function (_) {
      (_[(_.ALPHA_STRAIGHT = 0)] = 'ALPHA_STRAIGHT'),
        (_[(_.ALPHA_PREMULTIPLIED = 1)] = 'ALPHA_PREMULTIPLIED');
    })(N || (N = {})),
    (function (_) {
      (_[(_.RGB = 0)] = 'RGB'),
        (_[(_.RRR = 3)] = 'RRR'),
        (_[(_.GGG = 4)] = 'GGG'),
        (_[(_.AAA = 15)] = 'AAA');
    })(s || (s = {})),
    (function (_) {
      (_[(_.RGB = 0)] = 'RGB'),
        (_[(_.RGBA = 3)] = 'RGBA'),
        (_[(_.RRR = 4)] = 'RRR'),
        (_[(_.RRRG = 5)] = 'RRRG');
    })(i || (i = {}));
  class V {
    constructor() {
      (this.vkFormat = 0),
        (this.typeSize = 1),
        (this.pixelWidth = 0),
        (this.pixelHeight = 0),
        (this.pixelDepth = 0),
        (this.layerCount = 0),
        (this.faceCount = 1),
        (this.supercompressionScheme = M.NONE),
        (this.levels = []),
        (this.dataFormatDescriptor = [
          {
            vendorId: 0,
            descriptorType: C.BASICFORMAT,
            versionNumber: 2,
            descriptorBlockSize: 40,
            colorModel: K.UNSPECIFIED,
            colorPrimaries: r.SRGB,
            transferFunction: r.SRGB,
            flags: N.ALPHA_STRAIGHT,
            texelBlockDimension: { x: 4, y: 4, z: 1, w: 1 },
            bytesPlane: [],
            samples: [],
          },
        ]),
        (this.keyValue = {}),
        (this.globalData = null);
    }
  }
  class a {
    constructor(_, R, A, t) {
      (this._dataView = new DataView(_.buffer, _.byteOffset + R, A)),
        (this._littleEndian = t),
        (this._offset = 0);
    }
    _nextUint8() {
      const _ = this._dataView.getUint8(this._offset);
      return (this._offset += 1), _;
    }
    _nextUint16() {
      const _ = this._dataView.getUint16(this._offset, this._littleEndian);
      return (this._offset += 2), _;
    }
    _nextUint32() {
      const _ = this._dataView.getUint32(this._offset, this._littleEndian);
      return (this._offset += 4), _;
    }
    _nextUint64() {
      const _ =
        this._dataView.getUint32(this._offset, this._littleEndian) +
        2 ** 32 * this._dataView.getUint32(this._offset + 4, this._littleEndian);
      return (this._offset += 8), _;
    }
    _skip(_) {
      return (this._offset += _), this;
    }
    _scan(_, R = 0) {
      const A = this._offset;
      let t = 0;
      for (; this._dataView.getUint8(this._offset) !== R && t < _; ) t++, this._offset++;
      return (
        t < _ && this._offset++,
        new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + A, t)
      );
    }
  }
  function U(_) {
    return 'undefined' != typeof TextDecoder
      ? new TextDecoder().decode(_)
      : Buffer.from(_).toString('utf8');
  }
  var o,
    E = ['positiveX', 'negativeX', 'positiveY', 'negativeY', 'positiveZ', 'negativeZ'];
  function L(A, t) {
    var e,
      O = A.ktx2Buffer,
      M = A.supportedTargetFormats;
    try {
      e = (function (_) {
        const R = new Uint8Array(_.buffer, _.byteOffset, G.length);
        if (
          R[0] !== G[0] ||
          R[1] !== G[1] ||
          R[2] !== G[2] ||
          R[3] !== G[3] ||
          R[4] !== G[4] ||
          R[5] !== G[5] ||
          R[6] !== G[6] ||
          R[7] !== G[7] ||
          R[8] !== G[8] ||
          R[9] !== G[9] ||
          R[10] !== G[10] ||
          R[11] !== G[11]
        )
          throw new Error('Missing KTX 2.0 identifier.');
        const A = new V(),
          t = 17 * Uint32Array.BYTES_PER_ELEMENT,
          e = new a(_, G.length, t, !0);
        (A.vkFormat = e._nextUint32()),
          (A.typeSize = e._nextUint32()),
          (A.pixelWidth = e._nextUint32()),
          (A.pixelHeight = e._nextUint32()),
          (A.pixelDepth = e._nextUint32()),
          (A.layerCount = e._nextUint32()),
          (A.faceCount = e._nextUint32());
        const T = e._nextUint32();
        A.supercompressionScheme = e._nextUint32();
        const O = e._nextUint32(),
          n = e._nextUint32(),
          B = e._nextUint32(),
          M = e._nextUint32(),
          C = e._nextUint64(),
          K = e._nextUint64(),
          r = new a(_, G.length + t, 3 * T * 8, !0);
        for (let R = 0; R < T; R++)
          A.levels.push({
            levelData: new Uint8Array(_.buffer, _.byteOffset + r._nextUint64(), r._nextUint64()),
            uncompressedByteLength: r._nextUint64(),
          });
        const F = new a(_, O, n, !0),
          N = {
            vendorId: F._skip(4)._nextUint16(),
            descriptorType: F._nextUint16(),
            versionNumber: F._nextUint16(),
            descriptorBlockSize: F._nextUint16(),
            colorModel: F._nextUint8(),
            colorPrimaries: F._nextUint8(),
            transferFunction: F._nextUint8(),
            flags: F._nextUint8(),
            texelBlockDimension: {
              x: F._nextUint8() + 1,
              y: F._nextUint8() + 1,
              z: F._nextUint8() + 1,
              w: F._nextUint8() + 1,
            },
            bytesPlane: [
              F._nextUint8(),
              F._nextUint8(),
              F._nextUint8(),
              F._nextUint8(),
              F._nextUint8(),
              F._nextUint8(),
              F._nextUint8(),
              F._nextUint8(),
            ],
            samples: [],
          },
          s = (N.descriptorBlockSize / 4 - 6) / 4;
        for (let _ = 0; _ < s; _++)
          N.samples[_] = {
            bitOffset: F._nextUint16(),
            bitLength: F._nextUint8(),
            channelID: F._nextUint8(),
            samplePosition: [F._nextUint8(), F._nextUint8(), F._nextUint8(), F._nextUint8()],
            sampleLower: F._nextUint32(),
            sampleUpper: F._nextUint32(),
          };
        (A.dataFormatDescriptor.length = 0), A.dataFormatDescriptor.push(N);
        const i = new a(_, B, M, !0);
        for (; i._offset < M; ) {
          const _ = i._nextUint32(),
            R = i._scan(_),
            t = U(R),
            e = i._scan(_ - R.byteLength);
          (A.keyValue[t] = t.match(/^ktx/i) ? U(e) : e),
            i._offset % 4 && i._skip(4 - (i._offset % 4));
        }
        if (K <= 0) return A;
        const S = new a(_, C, K, !0),
          o = S._nextUint16(),
          E = S._nextUint16(),
          L = S._nextUint32(),
          P = S._nextUint32(),
          c = S._nextUint32(),
          f = S._nextUint32(),
          I = [];
        for (let _ = 0; _ < T; _++)
          I.push({
            imageFlags: S._nextUint32(),
            rgbSliceByteOffset: S._nextUint32(),
            rgbSliceByteLength: S._nextUint32(),
            alphaSliceByteOffset: S._nextUint32(),
            alphaSliceByteLength: S._nextUint32(),
          });
        const X = C + S._offset,
          u = X + L,
          D = u + P,
          l = D + c,
          x = new Uint8Array(_.buffer, _.byteOffset + X, L),
          h = new Uint8Array(_.buffer, _.byteOffset + u, P),
          H = new Uint8Array(_.buffer, _.byteOffset + D, c),
          d = new Uint8Array(_.buffer, _.byteOffset + l, f);
        return (
          (A.globalData = {
            endpointCount: o,
            selectorCount: E,
            imageDescs: I,
            endpointsData: x,
            selectorsData: h,
            tablesData: H,
            extendedData: d,
          }),
          A
        );
      })(O);
    } catch (_) {
      throw new R.RuntimeError('Invalid KTX2 file.');
    }
    if (0 !== e.layerCount) throw new R.RuntimeError('KTX2 texture arrays are not supported.');
    if (0 !== e.pixelDepth) throw new R.RuntimeError('KTX2 3D textures are unsupported.');
    var C = e.dataFormatDescriptor[0],
      K = new Array(e.levelCount);
    return (
      0 !== e.vkFormat || (163 !== C.colorModel && 166 !== C.colorModel)
        ? (t.push(O.buffer),
          (function (R, A) {
            var t,
              e = R.vkFormat === B.VK_FORMAT_R8G8B8_SRGB ? n.RGB : n.RGBA;
            R.vkFormat === B.VK_FORMAT_R8G8B8A8_UNORM
              ? (t = T.UNSIGNED_BYTE)
              : R.vkFormat === B.VK_FORMAT_R16G16B16A16_SFLOAT
              ? (t = T.HALF_FLOAT)
              : R.vkFormat === B.VK_FORMAT_R32G32B32A32_SFLOAT && (t = T.FLOAT);
            for (var O = 0; O < R.levels.length; ++O) {
              var G = {};
              A[O] = G;
              for (
                var M = R.levels[O].levelData,
                  C = R.pixelWidth >> O,
                  K = R.pixelHeight >> O,
                  r = C * K * n.componentsLength(e),
                  F = 0;
                F < R.faceCount;
                ++F
              ) {
                var N,
                  s = M.byteOffset + r * R.typeSize * F;
                (N =
                  _.defined(t) && 1 !== T.sizeInBytes(t)
                    ? 2 === T.sizeInBytes(t)
                      ? new Uint16Array(M.buffer, s, r)
                      : new Float32Array(M.buffer, s, r)
                    : new Uint8Array(M.buffer, s, r)),
                  (G[E[F]] = {
                    internalFormat: e,
                    datatype: t,
                    width: C,
                    height: K,
                    levelBuffer: N,
                  });
              }
            }
          })(e, K))
        : (function (A, t, e, T, O, B) {
            var G,
              M,
              C = new T.KTX2File(A),
              K = C.getWidth(),
              r = C.getHeight(),
              F = C.getLevels(),
              N = C.getHasAlpha();
            if (!(K > 0 && r > 0 && F > 0))
              throw (C.close(), C.delete(), new R.RuntimeError('Invalid KTX2 file'));
            var s = t.dataFormatDescriptor[0],
              i = T.transcoder_texture_format;
            if (163 === s.colorModel)
              if (e.etc)
                (G = N ? n.RGBA8_ETC2_EAC : n.RGB8_ETC2), (M = N ? i.cTFETC2_RGBA : i.cTFETC1_RGB);
              else if (e.etc1 && !N) (G = n.RGB_ETC1), (M = i.cTFETC1_RGB);
              else if (e.s3tc)
                (G = N ? n.RGBA_DXT5 : n.RGB_DXT1), (M = N ? i.cTFBC3_RGBA : i.cTFBC1_RGB);
              else if (e.pvrtc)
                (G = N ? n.RGBA_PVRTC_4BPPV1 : n.RGB_PVRTC_4BPPV1),
                  (M = N ? i.cTFPVRTC1_4_RGBA : i.cTFPVRTC1_4_RGB);
              else if (e.astc) (G = n.RGBA_ASTC), (M = i.cTFASTC_4x4_RGBA);
              else {
                if (!e.bc7)
                  throw new R.RuntimeError(
                    'No transcoding format target available for ETC1S compressed ktx2.'
                  );
                (G = n.RGBA_BC7), (M = i.cTFBC7_RGBA);
              }
            else if (166 === s.colorModel)
              if (e.astc) (G = n.RGBA_ASTC), (M = i.cTFASTC_4x4_RGBA);
              else if (e.bc7) (G = n.RGBA_BC7), (M = i.cTFBC7_RGBA);
              else if (e.s3tc)
                (G = N ? n.RGBA_DXT5 : n.RGB_DXT1), (M = N ? i.cTFBC3_RGBA : i.cTFBC1_RGB);
              else if (e.etc)
                (G = N ? n.RGBA8_ETC2_EAC : n.RGB8_ETC2), (M = N ? i.cTFETC2_RGBA : i.cTFETC1_RGB);
              else if (e.etc1 && !N) (G = n.RGB_ETC1), (M = i.cTFETC1_RGB);
              else {
                if (!e.pvrtc)
                  throw new R.RuntimeError(
                    'No transcoding format target available for UASTC compressed ktx2.'
                  );
                (G = N ? n.RGBA_PVRTC_4BPPV1 : n.RGB_PVRTC_4BPPV1),
                  (M = N ? i.cTFPVRTC1_4_RGBA : i.cTFPVRTC1_4_RGB);
              }
            if (!C.startTranscoding())
              throw (C.close(), C.delete(), new R.RuntimeError('startTranscoding() failed'));
            for (var S = 0; S < t.levels.length; ++S) {
              var V = {};
              (B[S] = V), (K = t.pixelWidth >> S), (r = t.pixelHeight >> S);
              var a = C.getImageTranscodedSizeInBytes(S, 0, 0, M.value),
                U = new Uint8Array(a),
                o = C.transcodeImage(U, S, 0, 0, M.value, 0, -1, -1);
              if (!_.defined(o)) throw new R.RuntimeError('transcodeImage() failed.');
              O.push(U.buffer),
                (V[E[0]] = { internalFormat: G, width: K, height: r, levelBuffer: U });
            }
            C.close(), C.delete();
          })(O, e, M, o, t, K),
      K
    );
  }
  function P(_) {
    (o = _).initializeBasis(), (self.onmessage = t(L)), self.postMessage(!0);
  }
  return function (R) {
    var A = R.data.webAssemblyConfig;
    if (_.defined(A))
      return require([A.modulePath], function (R) {
        if (!_.defined(A.wasmBinaryFile))
          return R().then(function (_) {
            P(_);
          });
        _.defined(R) || (R = self.MSC_TRANSCODER),
          R(A).then(function (_) {
            P(_);
          });
      });
  };
});
