#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(location = 0) out vec4 color;

layout (binding = 0) uniform sampler2D colorTex;

layout (location = 0 ) in VS_OUT
{
  vec2 texCoord;
} surf;

bool compareVec4(vec4 v1, vec4 v2) {
  return v1.x + v1.y + v1.z > v2.x + v2.y + v2.z;
}

void sort(inout vec4 pixels[9])
{
    int n = 9;
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = 0; j < n - i - 1; j++)
        {
            if (compareVec4(pixels[j], pixels[j + 1]))
            {
                vec4 temp = pixels[j];
                pixels[j] = pixels[j + 1];
                pixels[j + 1] = temp;
            }
        }
    }
}

void main()
{
    vec4 pixels[9];
    pixels[0] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2(-1,-1));
    pixels[1] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 0,-1));
    pixels[2] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 1,-1));
    pixels[3] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2(-1, 0));
    pixels[4] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2(0, 0));
    pixels[5] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 1, 0));
    pixels[6] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2(-1, 1));
    pixels[7] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 0, 1));
    pixels[8] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 1, 1));
    sort(pixels);

    color = pixels[4];
    //color = textureLod(colorTex, surf.texCoord, 0);
}
