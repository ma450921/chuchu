/***
 Here we check the devices' webgl cability.
 This will manage to get all texture units parameters and get legel precision
 
 returns:
 @this: WebglCability class Object
 ***/

export class WebglCability { 
    constructor(gl) {
        this.gl = gl;
        /***
         Maximum number of texture units. 
         The maximum number of texture units running at the same time 
         cannot be greater than this value
         ***/
        this.maxTextures = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
        /***
         Maximum number of texture units supported by vertex shaders
         ***/
        this.maxVertexShaderTextureUnits = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
        /***
         Maximum number of texture units supported by fragment shaders
         ***/
        this.maxFragmentShaderTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
        this.maxTexturesSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        this.maxVerticesOnceDraw = gl.getExtension('OES_element_index_uint') ? 4294967296 : 65535;
    }

    /***
     @precision input precision be expected
     returns: 
     @precision highest level precision which device supports
     ***/
    getLegelPrecision(precision) {
        const gl = this.gl;
        const vertexShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT);
        const vertexShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT);

        // get fragment precision format in high adn medium
        const fragmentShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
        const fragmentShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT);

        const highpAvailable =
            vertexShaderPrecisionHighpFloat.precision > 0 && fragmentShaderPrecisionHighpFloat.precision > 0;
        
        const mediumpAvailable =
            vertexShaderPrecisionMediumpFloat.precision > 0 && fragmentShaderPrecisionMediumpFloat.precision > 0;
        
        if ('highp' === precision && !highpAvailable) {
            if (mediumpAvailable) {
                precision = 'mediump';
            } else {
                precision = 'lowp';
            }
        } else if ('mediump' === precision && !mediumpAvailable) {
            precision = 'lowp';
        }
        return precision;
    }
}